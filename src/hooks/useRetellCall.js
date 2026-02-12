import { useState, useRef, useEffect } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { createRetellCall, requestMicrophonePermission } from '../services/retellService';
/**
 * Custom hook for managing Retell call state and operations
 */
export const useRetellCall = () => {
  // Call status: 'idle' | 'connecting' | 'in_call' | 'ended' | 'error'
  const [callStatus, setCallStatus] = useState('idle');
  const [accessToken, setAccessToken] = useState(null);
  const [callId, setCallId] = useState(null);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [isAgentTalking, setIsAgentTalking] = useState(false);

  // Ref to store the RetellWebClient instance
  const retellClientRef = useRef(null);

  /**
   * Start a new call
   */
  const startCall = async () => {
    try {
      setError(null);
      setCallStatus('connecting');

      // Step 1: Request microphone permission
      // Note: We request permission first, but the Retell SDK will also handle it
      try {
        await requestMicrophonePermission();
      } catch (micError) {
        // If permission fails, we still try to proceed as Retell SDK might handle it
        console.warn('Microphone permission warning:', micError.message);
        // Don't throw here - let Retell SDK try to handle it
      }

      // Step 2: Create Retell call via webhook
      const { access_token, call_id } = await createRetellCall();
      setAccessToken(access_token);
      setCallId(call_id);

      // Step 3: Initialize RetellWebClient if not already initialized
      if (!retellClientRef.current) {
        retellClientRef.current = new RetellWebClient();
        setupEventListeners();
      }

      // Step 4: Start the call using startCall method with accessToken object
      // The SDK will request microphone permission again if needed
      await retellClientRef.current.startCall({
        accessToken: access_token,
      });
      setCallStatus('in_call');
    } catch (err) {
      console.error('Error starting call:', err);
      
      // Provide more specific error messages
      let errorMessage = err.message || 'Failed to start call';
      
      // Check if it's a microphone permission error
      if (err.message && (err.message.includes('microphone') || err.message.includes('Microphone') || err.message.includes('permission'))) {
        errorMessage = err.message; // Use the detailed message from requestMicrophonePermission
      } else if (err.message && err.message.includes('NotAllowedError')) {
        errorMessage = 'Microphone permission denied. Please allow microphone access and try again.';
      }
      
      setError(errorMessage);
      setCallStatus('error');
    }
  };

  /**
   * Hang up the current call
   */
  const hangUpCall = () => {
    try {
      if (retellClientRef.current) {
        retellClientRef.current.stopCall();
        retellClientRef.current = null;
      }
      setCallStatus('ended');
      setAccessToken(null);
      setCallId(null);
      setIsAgentTalking(false);
      // Clear transcript after a short delay
      setTimeout(() => {
        setTranscript([]);
        setCallStatus('idle');
      }, 2000);
    } catch (err) {
      console.error('Error hanging up call:', err);
      setError(err.message || 'Failed to hang up call');
    }
  };

  /**
   * Set up event listeners for Retell SDK events
   */
  const setupEventListeners = () => {
    const client = retellClientRef.current;
    if (!client) return;

    // Call started event
    client.on('call_started', () => {
      setCallStatus('in_call');
      setError(null);
    });

    // Call ended event
    client.on('call_ended', () => {
      setCallStatus('ended');
      setIsAgentTalking(false);
      // Reset to idle after a short delay
      setTimeout(() => {
        setCallStatus('idle');
        setTranscript([]);
      }, 2000);
    });

    // Agent started talking
    client.on('agent_start_talking', () => {
      setIsAgentTalking(true);
    });

    // Agent stopped talking
    client.on('agent_stop_talking', () => {
      setIsAgentTalking(false);
    });

    // Error event
    client.on('error', (error) => {
      console.error('Retell SDK error:', error);
      setError(error.message || 'An error occurred during the call');
      setCallStatus('error');
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retellClientRef.current) {
        try {
          retellClientRef.current.stopCall();
        } catch (err) {
          console.error('Error cleaning up Retell client:', err);
        }
      }
    };
  }, []);

  return {
    callStatus,
    accessToken,
    callId,
    error,
    transcript,
    isAgentTalking,
    startCall,
    hangUpCall,
  };
};
