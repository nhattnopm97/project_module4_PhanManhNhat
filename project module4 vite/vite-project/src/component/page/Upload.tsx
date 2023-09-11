import { useState, useEffect } from "react";
import { storage } from "../../firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  StorageReference,
} from "firebase/storage";
import ReactAudioPlayer from "react-audio-player";

function Upload() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const imagesListRef: StorageReference = ref(storage, "audio/");

  const uploadFile = (): void => {
    if (imageUpload == null) return;

    const imageRef: StorageReference = ref(
      storage,
      `audio/${imageUpload.name}`
    );

    uploadBytes(imageRef, imageUpload).then(() => {
      getDownloadURL(imageRef).then((url: string) => {
        setImageUrls((prev: string[]) => [...prev, url]);
        alert("up load thanh cong!");
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url: string) => {
          setImageUrls((prev: string[]) => [...prev, url]);
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);

  return (
    <div className="mt-[120px]">
      <input
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            setImageUpload(e.target.files[0]);
          }
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url: string, index: number) => {
        return (
          <ReactAudioPlayer
            key={index}
            src={url}
            autoPlay={false}
            controls
            style={{ width: "100%" }}
            loop={true}
          />
        );
      })}

      <ReactAudioPlayer
        src="https://firebasestorage.googleapis.com/v0/b/firsttimefirebase-46044.appspot.com/o/audio%2F1%20Ph%C3%BAt%20%20Andiez.mp3?alt=media&token=3b170cd6-7f33-4c3f-a2a7-bd60749c9548"
        autoPlay={false}
        controls
        style={{ width: "100%" }}
        loop={true}
      />
    </div>
  );
}

export default Upload;
