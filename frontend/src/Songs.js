import React, { useEffect, useState } from "react";
import "./Songs.css";

const Songs = () => {
    const [songs, setSongs] = useState([]);

    // Fetch songs from the backend
    useEffect(() => {
        fetch("http://localhost:8081/get-songs")
            .then((response) => response.json())
            .then((data) => {
                setSongs(data);
            })
            .catch((error) => {
                console.error("Error fetching songs:", error);
            });
    }, []);

    return (
        <div className="songs-container">
            {songs.length > 0 ? (
                songs.map((song) => (
                    <div className="song-card" key={song.id}>
                        <img
                            src={`http://localhost:8081/uploads/${song.cover_photo}`}
                            alt={`${song.song_name} Cover`}
                            className="song-cover"
                        />
                        <div className="song-details">
                            <h3 className="song-name">{song.song_name}</h3>
                            <p className="song-description">{song.description}</p>
                            <a
                                href={`http://localhost:8081/uploads/${song.song_file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="song-play-btn"
                            >
                                Play Song
                            </a>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-songs">No songs available</p>
            )}
        </div>
    );
};

export default Songs;
