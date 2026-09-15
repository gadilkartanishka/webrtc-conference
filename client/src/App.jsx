import { useRef, useState } from 'react';
import './index.css';

function App() {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Permission denied or error accessing media devices:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      {!isStreaming && (
        <button onClick={startCamera}>Start Camera</button>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '400px',
          borderRadius: '8px',
          display: isStreaming ? 'block' : 'none'
        }}
      />
    </div>
  );
}

export default App;
