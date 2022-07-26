function voted() {
    blogId = document.getElementById('blogid').value;
    const req = new XMLHttpRequest;
    req.onreadystatechange = async function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = await JSON.parse(this.responseText);
            document.getElementById("votesCount").innerHTML = data.upvote;
        }
    };
    req.open("GET", `http://localhost:3000/singleBlog/vote/${blogId}`, true);
    req.send();
}