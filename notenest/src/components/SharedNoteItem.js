import React from 'react';

function SharedNoteItem({ sharedNote }) {
    return (
        <div>
            <h4>{sharedNote.note_id.title}</h4>
            <p>{sharedNote.note_id.description}</p>
            <p>Shared by: {sharedNote.sender_id.username}</p>
            {/* Add any additional information you want to display */}
        </div>
    );
}

export default SharedNoteItem;
