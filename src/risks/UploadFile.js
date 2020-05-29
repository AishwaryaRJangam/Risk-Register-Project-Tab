import React,{Component} from 'react'; 
  
import { Upload } from '@progress/kendo-react-upload';

function UploadFile() {

  
    return (
    <div>
     <h4>Upload Files</h4>
     <center> 
          
        <div><i class="fa fa-cloud-upload" aria-hidden="true"></i></div>
        <Upload
        batch={false}
        multiple={true}
        defaultFiles={[]}
        withCredentials={false}
        saveUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/save'}
        removeUrl={'https://demos.telerik.com/kendo-ui/service-v4/upload/remove'}
        />
    </center>
</div>
    );
}



export { UploadFile };