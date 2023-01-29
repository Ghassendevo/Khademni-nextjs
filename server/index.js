const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const User = require('./models/User');
const Job = require('./models/Job');
const { Server } = require('socket.io')
app.use(cors());
const Bid = require('./models/Bid');
const server = http.createServer(app);
const fs = require("fs")
const multer = require("multer")
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb+srv://ghassen:ghassen@cluster0.albi7.mongodb.net/khademni?retryWrites=true&w=majority').then(res => {
    console.log('connected to khademni database ')
})


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('join_room', (data) => {
        socket.join(data.roomId);
        socket.to(data.roomId).emit("new_user", data)
        console.log(`user has joined the room ${data.roomId}`)
    })
    socket.on('send_message', (data) => {
        socket.to(data.roomId).emit("receive_message", data);
    })
})
app.post('/sign', (req, res) => {
    const data = req.body.data;
    const user = new User({
        fullname: data.fullname,
        username: data.username,
        password: data.password,
        img: 'none',
    })
    User.find({ username: data.username }).then(succ => {
        if (succ.length > 0) res.send('user-exist')
        else res.send('new'), user.save()
    })
})
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './Profile_Img/all')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage })
app.post('/uploadimg', upload.single('file'), (req, res) => {
    const id = req.body.id
    if (!fs.existsSync('./Profile_Img/' + [id])) {
        // if not create directory
        fs.mkdirSync('./Profile_Img/' + [id]);
    }
    fs.rename('./profile_Img/all/' + req.file.filename, './profile_Img/' + id + '/' + req.file.filename, function(err) {
        if (err) {
            return console.error(err);
        }
        res.json({});
    });
    User.updateOne({ _id: id }, { $set: { image: `./profile_Img/+${id}/${req.file.filename}` } })
})
app.post('/login', (req, res) => {
    const data = req.body.data;
    User.find({ $and: [{ username: data.username }, { password: data.password }] }).then(succ => {
        if (succ.length > 0) res.send({ msg: true, id: succ[0].id });
        else res.send({ msg: false });
    })

})
app.post('/getInfo', (req, res) => {
    const id = req.body.data;
    User.findOne({ _id: id }).then(succ => {
        res.send(succ)
    })

})
app.post('/addPost', (req, res) => {
    const e = req.body.data;
    const job = new Job({
        user: e.id,
        fullname: e.fullname,
        title: e.title,
        budgetFrom: e.budgetFrom,
        budgetTo: e.budgetTo,
        bids: 0,
        city: e.place,
        description: e.description,
        star: 0,
        categorie: e.categorie,
        data: e.data,
    })

    job.save().then(succ => {
        res.send(true)
    })
})
app.post('/deleteAll', async(req, res) => {
    let id = req.body.data;
    Job.deleteMany({ userid: id }).then(succ => {
        res.send(true);
    })
})
app.post('/myallpost', async(req, res) => {
    let id = req.body.data;
    Job.find({ user: id }).sort({ _id: -1 }).then(succ => {
        res.send(succ);
    })
})
app.post('/getPost', async(req, res) => {
    const e = req.body.data;
    Job.find({ categorie: "all" }).sort({ _id: -1 }).then(succ => {
        if (succ.length > 0) {
            res.json(succ);
        } else {
            res.send(false);
        }
    })
})
app.post('/deleteone', async(req, res) => {
    const id = req.body.data;
    Job.findOneAndDelete({ _id: id }).then(succ => {
        res.send(true);
    })
})
app.post('/search', async(req, res) => {
    let e = req.body.data;
    Job.find({ title: { $regex: e, $options: 'i' } }).limit(5).then(succ => {
        if (succ.length > 0) res.send(succ);
        else res.send(false);
    });
})
app.post('/searchForid', async(req, res) => {
    let e = req.body.data;
    Job.find({ title: { $regex: e.title, $options: 'i' }, user: e.id, }).limit(5).then(succ => {
        if (succ.length > 0) res.send(succ), console.log(succ);
        else res.send([]);
    });
})
app.post('/getone', async(req, res) => {
    let e = req.body.data;
    Job.findOne({ _id: e }).then(succ => {
        res.send(succ);
    })
})
app.post('/bid', async(req, res) => {
    let e = req.body.data;
    const bid = new Bid({
        userid: e.userid,
        postid: e.postid,
        amount: e.amount,
        days: e.days,
        desc: e.desc,
        fullname: e.fullname,
    })
    bid.save().then(succ => {
        res.send(true);
    })
    Job.updateOne({ _id: e.postid }, { $push: { bid: bid } }).catch(err => console.log(err))
    Job.findOneAndUpdate({ _id: e.postid }, { $inc: { bids: +1 } })

})
app.post('/getproposal', async(req, res) => {
    let e = req.body.data;
    Job.find({ "bid.userid": e }).then(succ => {
        res.send(succ);
    })
})
app.post('/updatepost', async(req, res) => {
    let e = req.body.data;
    Job.findByIdAndUpdate({ _id: e.id }, {
        $set: {
            title: e.title,
            budgetFrom: e.budgetfrom,
            budgetTo: e.budgetto,
            description: e.description,
            city: e.city,
            categorie: e.categorie,
        }
    }).then(succ => {
        res.send(true)
    }).catch(err => {
        console.log(err)
    })
})
server.listen(3001, () => {
    console.log('server running')
})