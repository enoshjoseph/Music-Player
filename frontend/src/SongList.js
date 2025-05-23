import React, { useEffect, useState } from "react";
import "./SongList.css"; // Create a CSS file for styling your cards

const SongList = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Fetch the songs from the backend
    fetch("http://localhost:8081/get-songs")
      .then((response) => response.json())
      .then((data) => {
        setSongs(data); // Set the fetched songs to state
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  return (
    <div className="song-list-container">
      <h1>All Songs</h1>
      <div className="song-cards-container">
        {songs.length > 0 ? (
          songs.map((song) => (
            <div className="song-card" key={song.id}>
              <img
                src={`${song.cover_photo}`}
                alt={song.song_name}
                className="song-cover-photo"
              />
              <div className="song-details">
                <h2>{song.song_name}</h2>
                <p>{song.description}</p>
                <audio controls>
                  <source
                    src={`${song.song_file}`}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>
    </div>
  );
};

export default SongList;
