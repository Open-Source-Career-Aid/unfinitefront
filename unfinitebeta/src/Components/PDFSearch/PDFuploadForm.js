import { ImFolderUpload } from 'react-icons/im';
import { event } from 'react-ga';

function UploadPDFFormUI({ processing, loadalert, handleFileChange, handleFileButton, handleSubmit, fileInputRef }) {
  return (
    <div style={{display:"inline"}}>
      { processing ? (
        <div className="loader">{loadalert}</div>
      ) : (
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'inline' }}>
          <label htmlFor="upload">
            {/* <ImFolderUpload size={25} style={{ marginLeft: '1em', cursor: 'pointer', color: "#40b600" }}/> */}
            <div className='uploadButton'></div>
            <input type="file" accept=".pdf" onInput={handleFileChange} id="upload" ref={fileInputRef} onChange={handleFileButton} style={{display: "none"}}/>
          </label>
          <button type="submit" style={{display:"none"}}>Upload</button>
        </form>
      )}
    </div>
  );
}
export default UploadPDFFormUI;