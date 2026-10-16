import { useState, useEffect } from 'react'

function App() {

  const [videoUrl, setVideoUrl] = useState("");
   const [fileName, setFileName] = useState("");

    function handleVideoUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      alert("Please select a video file.");
      event.target.value = "";
      return;
    }

    const temporaryUrl = URL.createObjectURL(file);

    setVideoUrl(temporaryUrl);
    setFileName(file.name);
  }
 useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div>
     <main className='app'>
       <header className='topbar'>

        <div className='brand'>
          <span className='brandicon'>▶</span>
          <h1>e4Edits</h1>
        </div>

        <span className='projectname'>untitled project</span>
         

       </header>

       <section className='workspace'>
        <aside className="panel media-panel">
          <h2>Media</h2>
          <p className="muted">
            Import a video to get started.
          </p>
           <label className="upload-button">
            + Import video
            <input type='file' accept='video/*' onChange={handleVideoUpload}></input>
          </label>

          {fileName && (
            <div className="media-item">
              <span>🎬</span>
              <span className="file-name">
                {fileName}
              </span>
            </div>
          )}
        </aside>

         <section className="panel preview-panel">
          <div className="panel-heading">
            <h2>Preview</h2>
            <span className="muted">Original video</span>
          </div>
           <div className="video-stage">
            {videoUrl ? (
              <video
                key={videoUrl}
                src={videoUrl}
                controls
                playsInline
                className="video-player"
              >
                Your browser cannot play this video.
              </video>
            ) : (<div className="empty-preview">
                <span className="play-icon">▶</span>
                <p>Your video will appear here</p>
                <p className="muted">
                  Choose a video from your computer.
                </p>
              </div>
            )}
          </div>
          </section>
       </section>

        <section className="panel timeline-panel">
        <div className="panel-heading">
          <h2>Timeline</h2>
          <span className="muted">
            {videoUrl ? "1 video imported" : "No clips yet"}
          </span>
        </div>
        <div className="timeline-track">
          {videoUrl ? (
            <div className="clip-block">
              🎬 {fileName}
            </div>
          ) : (
            <p className="muted">
              Import a video to see it here.
            </p>
          )}
        </div>
      </section>

     </main>
    </div>
  )
}

export default App
