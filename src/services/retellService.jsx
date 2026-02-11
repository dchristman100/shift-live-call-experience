/**
 * Service for handling Retell API calls and SDK interactions
 */

// Retell API configuration
// Note: For production, use environment variables instead of hardcoding the API key
const RETELL_API_KEY = import.meta.env.VITE_RETELL_API_KEY || 'key_d754964d3f093d75a8d1201080ba';
const RETELL_AGENT_ID = import.meta.env.VITE_RETELL_AGENT_ID || 'agent_7e437cea19750e2efc31a11add';
const RETELL_API_BASE_URL = 'https://api.retellai.com';

// Alternative: n8n webhook endpoint (fallback option)
const WEBHOOK_ENDPOINT = 'https://shiftnowai.app.n8n.cloud/webhook/create-retell-call';

/**
 * Create a new Retell call by calling the Retell API directly
 * @returns {Promise<{access_token: string, call_id: string}>}
 */
export const createRetellCall = async () => {
  try {
    // Prepare request body with agent_id
    const requestBody = {
      agent_id: RETELL_AGENT_ID,
    };

    // Call Retell API directly with API key
    // Correct endpoint is /v2/create-web-call
    const response = await fetch(`${RETELL_API_BASE_URL}/v2/create-web-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RETELL_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      console.error('Retell API Error Response:', errorData);
      throw new Error(errorData.message || `Failed to create call: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.access_token || !data.call_id) {
      throw new Error('Invalid response: missing access_token or call_id');
    }

    
    return {
      access_token: data.access_token,
      call_id: data.call_id,
    };
  } catch (error) {
    console.error('Error creating Retell call:', error);
    throw error;
  }
};

/**
 * Check if the app is running inside an iframe
 * @returns {boolean}
 */
export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true; // If we can't access window.top, we're likely in an iframe
  }
};

/**
 * Get a user-friendly error message for microphone permission errors
 * @param {Error} error - The error object from getUserMedia
 * @returns {string}
 */
const getMicrophoneErrorMessage = (error) => {
  const isIframe = isInIframe();
  
  if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
    if (isIframe) {
      return 'Microphone access denied. Please check that the iframe has the "microphone" permission enabled. Example: <iframe allow="microphone">';
    }
    return 'Microphone permission denied. Please allow microphone access in your browser settings.';
  }
  
  if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
    return 'No microphone device found. Please connect a microphone and try again.';
  }
  
  if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
    return 'Microphone is being used by another application. Please close other apps using the microphone.';
  }
  
  if (error.name === 'OverconstrainedError') {
    return 'Microphone constraints could not be satisfied.';
  }
  
  if (error.name === 'SecurityError') {
    if (isIframe) {
      return 'Microphone access blocked for security reasons. The iframe must be served over HTTPS and have proper permissions.';
    }
    return 'Microphone access blocked for security reasons. Please ensure the page is served over HTTPS.';
  }
  
  if (error.name === 'TypeError') {
    if (isIframe && !navigator.mediaDevices) {
      return 'Microphone API not available. The iframe may need additional permissions or the browser may not support this feature.';
    }
    return 'Microphone API not available in this browser.';
  }
  
  // Generic error
  if (isIframe) {
    return 'Unable to access microphone. Please ensure the iframe has microphone permissions and the page is served over HTTPS.';
  }
  
  return 'Microphone permission denied or not available. Please check your browser settings.';
};

/**
 * Request microphone permission from the browser
 * Enhanced for iframe support
 * @returns {Promise<MediaStream>}
 */
export const requestMicrophonePermission = async () => {
  // Check if mediaDevices API is available
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    const isIframe = window.self !== window.top;
    throw new Error(
      isIframe
        ? 'Microphone API not available. Please ensure the iframe has microphone permissions: <iframe allow="microphone">'
        : 'Microphone API not supported in this browser.'
    );
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });
    // Stop the stream immediately - we just needed permission
    stream.getTracks().forEach(track => track.stop());
    return stream;
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    const friendlyMessage = getMicrophoneErrorMessage(error);
    throw new Error(friendlyMessage);
  }
};
