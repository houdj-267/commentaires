let comments = [];

function renderComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '';

    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
    
        // Création du corps du commentaire
        const commentBody = document.createElement('div');
        commentBody.classList.add('comment-body');
        commentBody.textContent = comment.text;
        commentDiv.appendChild(commentBody);
        
        // Création du footer du commentaire 
        const commentFooter = document.createElement('div');
        commentFooter.classList.add('comment-footer');
        commentFooter.innerHTML = `
           
            <button onclick="showReplyBox(${index})">Répondre</button>
        `;
        commentDiv.appendChild(commentFooter);
        
        // Affichage des réponses
        if (comment.replies.length > 0) {
            const repliesDiv = document.createElement('div');
            comment.replies.forEach((reply, replyIndex) => {
                const replyDiv = document.createElement('div');
                replyDiv.classList.add('reply-section');
                replyDiv.innerHTML = `
                    <div> ${reply.text}</div>
                  
                `;
                repliesDiv.appendChild(replyDiv);
            });
            commentDiv.appendChild(repliesDiv);
        }

        commentsList.appendChild(commentDiv);
    });
}

// Fonction pour ajouter un commentaire
function addComment() {
    const commentText = document.getElementById('comment-text').value.trim();
    if (commentText === '') {
        alert('Le commentaire ne peut pas être vide.');
        return;
    }
    
    const newComment = {
        id: comments.length + 1,
        text: commentText,
        replies: [],
    };
    
    comments.push(newComment);
    document.getElementById('comment-text').value = ''; 
    renderComments(); // Mettre à jour l'affichage des commentaires
}

function showReplyBox(commentIndex) {
    const comment = comments[commentIndex];
    const commentDiv = document.getElementsByClassName('comment')[commentIndex];
    
    let replyBox = commentDiv.querySelector('.reply-section textarea');
    if (!replyBox) {
        replyBox = document.createElement('textarea');
        replyBox.placeholder = 'Répondez...';
        const replyFooter = document.createElement('div');
        replyFooter.classList.add('reply-footer');
        const replyButton = document.createElement('button');
        replyButton.textContent = 'Répondre';
        replyButton.onclick = () => addReply(commentIndex, replyBox.value);
        replyFooter.appendChild(replyButton);
        
        const replySection = document.createElement('div');
        replySection.classList.add('reply-section');
        replySection.appendChild(replyBox);
        replySection.appendChild(replyFooter);
        
        commentDiv.appendChild(replySection);
    }
}

// Ajouter une réponse au commentaire
function addReply(commentIndex, replyText) {
    if (replyText.trim() === '') {
        alert('La réponse ne peut pas être vide.');
        return;
    }
    
    const reply = {
        id: comments[commentIndex].replies.length + 1,
        text: replyText,
    };
    
    comments[commentIndex].replies.push(reply);
    renderComments(); 
}
