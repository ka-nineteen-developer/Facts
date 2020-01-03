// db.collection("users").add({
//     facts: "Ada",
//     isPublished: true,
//     id: 1815
// })
//     .then(function (docRef) {
//         console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//         console.error("Error adding document: ", error);
//     });


// clear the existing list
let request = db.collection("users").get().then((querySnapshot) => {
    $('#unPublishedList').empty();
    var publishedArray = [];
    var unPublishedArray = [];
    querySnapshot.forEach((doc) => {
        console.log(doc.data());
        if(doc.data().isPublished){
            publishedArray.push(doc.data())
            $('#publishedList').append(`<li id="` + doc.id + `"
                                        class="list-group-item">`
                                        + doc.data().facts +
                                        `<p>
                                        <span class="glyphicon glyphicon-remove"></span>
                                        <span class="glyphicon glyphicon-trash"></span>
                                        </p>
                                        </li>`)
        } else {
            unPublishedArray.push(doc.data())
            $('#unPublishedList').append(`<li id="` + doc.id + `"
                                            class="list-group-item">`
                                            + doc.data().facts +
                                            `<p>
                                            <span class="glyphicon glyphicon-plus"></span>
                                            <span class="glyphicon glyphicon-trash"></span>
                                            </p>
                                            </li>`)
        }
    });
});

function movedIten(data){
    console.log(data);
}

