import { createClient } from '@supabase/supabase-js';
import { message } from 'antd';

const supabaseUrl = 'https://xgljluaoqtiujshwsubc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnbGpsdWFvcXRpdWpzaHdzdWJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4MjM2NTQsImV4cCI6MjA1NzM5OTY1NH0.usASQ3XibpK2jZH1URoi2XnSkTZdxoTJwwulmH34Uug';
const supabase = createClient(supabaseUrl, supabaseKey);
const folderName = 'adminData';
const BucketName = 'ums-docs-dev';
const PrivateBucketName = 'ums-docs-dev'; //replace later

export const uploadFile = async (file) => {
    console.log('uploading file ', file.name);
    const { data, error } = await supabase.storage
      .from(BucketName)
      .upload(`${folderName}/${file.uid+file.name}`, file);
  
    if (error) {
      console.error('Error uploading file:', error.message);
      return "false";
    } else {
      console.log('File uploaded successfully:');
      const publicURL = `${supabaseUrl}/storage/v1/object/${BucketName}/${folderName}/${file.uid+file.name}`
      return publicURL;
    }
  };

 export const deleteFile = async (file) => {
    try {
       console.log('removing file ', file.name);
      const { data, error } = await supabase.storage
        .from(BucketName)
        .remove([`${folderName}/${file.uid+file.name}`]);
  
      if (error) {
        console.error('Error deleting file:', error.message);
      } else {
        console.log('File deleted successfully:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const DownloadFile = async (fileName) => {
    try {
      const { data, error } = await supabase
        .storage
        .from(PrivateBucketName)
        .download(fileName);
      
      if (error) {
        throw error;
      }
  
      console.log('File downloaded successfully:', data);
  
      // Create a URL for the downloaded file
      const url = URL.createObjectURL(data);
  
      // Create a temporary anchor element and trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.split('/').pop(); // Use the file name from the path
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
    }
  };