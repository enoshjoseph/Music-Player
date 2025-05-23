import React, { useState } from "react";
import "./AddSong.css";

const AddSong = () => {
    const [songName, setSongName] = useState("");
    const [description, setDescription] = useState("");
    const [songFile, setSongFile] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!songName || !description || !songFile || !coverPhoto) {
            setMessage("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("songName", songName);
        formData.append("description", description);
        formData.append("songFile", songFile);
        formData.append("coverPhoto", coverPhoto);

        try {
            const response = await fetch("http://localhost:8081/add-song", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Song added successfully!");
            } else {
                setMessage(`Error: ${data.message || "Failed to add song"}`);
            }
        } catch (error) {
            console.error("Error adding song:", error);
            setMessage("An error occurred while adding the song.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h1>Add Song</h1>
                </div>
                <div className="form-group">
                    <label htmlFor="songName">Song Name</label>
                    <input
                        type="text"
                        id="songName"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                        placeholder="Enter song name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        placeholder="Enter song description"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="songFile">Song File</label>
                    <input
    type="file"
    id="songFile"
    name="songFile" 
    onChange={(e) => setSongFile(e.target.files[0])}
    accept="audio/*"
    required
/>

                </div>
                <div className="form-group">
                    <label htmlFor="coverPhoto">Cover Photo</label>
                    <input
                        type="file"
                        id="coverPhoto"
                        onChange={(e) => setCoverPhoto(e.target.files[0])}
                        accept="image/*"
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Add Song</button>
                </div>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default AddSong;
