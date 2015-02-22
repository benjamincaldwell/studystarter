var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        console.log("get");
        
        if(req.query){
            
            if(req.query._id){
                
                console.log("asking for id")
            Todo.find({_id:req.query._id},function(err,docs){

                    res.json(docs)
                });
                
            
            }
                 
            if (req.query.rank){
                console.log("They are asking for rank");
                console.log(req.query.rank);
                
//                Todo.find({}, function(err,docs){
//                    res.json(docs)
//                })
                Todo.find({}).sort({rank:-1}).limit(req.query.rank).
                exec(function(err,docs){

                    res.json(docs)
                });
                
            }

        }

        // use mongoose to get all todos in the database
        //getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        console.log("Hey " + req.body);
        console.log(req.body)

        var data = req.body;

        // create a todo, information comes from AJAX request from Angular
        Todo.create({

            studyName: data.studyName || "Not Provided",
            sex: data.sex || "Not Provided",
            age: data.age || "Not Provided",
            summaryDescription: data.summaryDescription || "Not Provided",
            fullDescription: data.fullDescription || "Not Provided",
            statDate: data.startDate || "Not Provided",
            endDate: data.endDate || "Not Provided",
            compensation: data.compensation || 'Not Provided',
            phoneNumber: data.phoneNumber || 'Not Provided',
            email: data.email || 'Not Provided',
            duration: data.duration || 'Not Provided',
            timeLength: data.time || 'Not Provided',
            rank: Math.ceil((Math.random() * 40)),
            researcher:data.researcher || "Not Provided",
            location: data.townCity || "Not Provided",
            otherRequirements: data.otherRequirements || "Not Provided",
            studyType: data.studyType || "Not Provided",
            areaOfInterest: data.areaOfInterest || "Not Provided",

            //text: req.body.text,
            //description: "One small step",
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('/adsf', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};