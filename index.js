/*const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const userModel = require('./models/user');
const productModel = require('./models/product');


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

//port number to run the site
const port = 8000;


//routes
app.get('/',isloggedIn,async function(req,res){
    const products = await productModel.find(); // Fetch all products from the database
        res.render('home', { products: products }); 
    
})

//lets create a user

app.get('/user',function(req,res){
    res.render('user')
})

app.post('/create',function(req,res){
    let{name,email,password,phoneNumber,address} = req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
         let createdUser = await userModel.create({
            name,
            email,
            password:hash,
            phoneNumber,
            address
         })
         let token = jwt.sign({email},'yogesh');
         res.cookie("token",token);
         res.redirect('/');
        })
    })
})

//login a user

app.get('/login', function(req,res){
    res.render('login')
})

app.post('/login',async function(req,res){
    let user = await userModel.findOne({email : req.body.email});
    if(!user){
        return res.status(401).send({message : "Invalid Email or Password"})
    }
    bcrypt.compare(req.body.password,user.password,function(err,result){
        if(result){
            let token = jwt.sign({email:user.email},'yogesh');
            res.cookie("token",token);
            res.redirect('/');
        }
        else{
            return res.status(401).send({message : "Invalid Email or Password "})
        }
    })
})

//logout a user
app.get('/logout',function(req,res){
    res.clearCookie("token");
    res.redirect('/user');
})



// is userloggedin or not
function isloggedIn(req, res, next) {
    if (!req.cookies.token) {  // Corrected from req.cookie to req.cookies
        res.redirect('/login')
    } else {
        jwt.verify(req.cookies.token, "yogesh", (err, data) => {  // Added callback to handle errors
            if (err) {
                return res.status(401).send('Invalid Token');
            }
            req.user = data;
            next();
        });
    }
}

//product form
app.get('/product-form', async function(req,res){
    res.render('admin')
})




//diskstorage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/images')
    },
    filename : function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})
module.exports = upload;

//upload product
app.post('/uploads',upload.single('image'), async function(req,res){
    let{productName,Price,} = req.body;
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` 
    let createdProduct = await productModel.create({
        productName,
        Price,
        productImage : imageUrl
     })
    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})*/

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const methodOverride = require('method-override');
const userModel = require('./models/user');
const productModel = require('./models/product');
const orderModel = require('./models/order');
const contactModel = require('./models/contact')

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

const port = 8000;

// Routes
app.get('/', isloggedIn, async function (req, res) {
    const products = await productModel.find(); // Fetch all products from the database
    res.render('home', { products: products });
});

app.get('/user', function (req, res) {
    res.render('user');
});

app.post('/create', function (req, res) {
    let { name, email, password, phoneNumber, address } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                name,
                email,
                password: hash,
                phoneNumber,
                address
            });
            let token = jwt.sign({ email }, 'yogesh');
            res.cookie("token", token);
            res.redirect('/');
        });
    });
});

app.post('/contact', async function (req, res) {
    let { name, email, textArea, phoneNumber, address } = req.body;
            let createdcontact = await contactModel.create({
                name,
                email,
                textArea,
                phoneNumber,
                address
            });
            res.redirect('/');
        });
  



app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', async function (req, res) {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).send({ message: "Invalid Email or Password" });
    }
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, 'yogesh');
            res.cookie("token", token);
            res.redirect('/');
        } else {
            return res.status(401).send({ message: "Invalid Email or Password " });
        }
    });
});

app.get('/logout', function (req, res) {
    res.clearCookie("token");
    res.redirect('/user');
});

/*function isloggedIn(req, res, next) {
    if (!req.cookies.token) {
        res.redirect('/login');
    } else {
        jwt.verify(req.cookies.token, "yogesh", (err, data) => {
            if (err) {
                return res.status(401).send('Invalid Token');
            }
            req.user = data;
            next();
        });
    }
}*/

function isloggedIn(req, res, next) {
    if (!req.cookies.token) {
        res.redirect('/login');
    } else {
        jwt.verify(req.cookies.token, "yogesh", async (err, data) => {
            if (err) {
                return res.status(401).send('Invalid Token');
            }
            const user = await userModel.findOne({ email: data.email });
            req.user = user;
            next();
        });
    }
}

//login form for admin pannel



// Dashboard Route to display orders and products
app.get('/dashboad', async function (req, res) {
    try {
        const products = await productModel.find(); // Fetch all products
        const orders = await orderModel.find(); // Fetch all orders
        res.render('admin', { products: products, orders: orders });
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while loading the dashboard.");
    }
});

// DELETE route for deleting a product by ID
app.delete('/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(productId);
        if (deletedProduct) {
            res.status(200).redirect('/dashboad')
        } else {
            res.status(404).json({ message: 'Product not found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting product!' });
    }
});


// Disk storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Handle file upload and product creation
app.post('/uploads', upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }]), async function (req, res) {
    const { productName, Price } = req.body;

    const imageUrl = `/uploads/images/${req.files['img1'][0].filename}`;
    const imageUrl2 = `/uploads/images/${req.files['img2'][0].filename}`;

    await productModel.create({
        productName,
        Price,
        productImage: imageUrl,
        productImage2: imageUrl2
    });

    res.redirect('/dashboad');
});




// Order Route
app.post('/order', isloggedIn, async function (req, res) {
    try {
        const userId = req.user._id; // Get the user ID from the logged-in user
        const userName = req.user.name; // Get the user name from the logged-in user
        const userNumber = req.user.phoneNumber;
        const userAddress = req.user.address;
        const userEmail = req.user.email;
        const productId = req.body.productId; // Get the product ID from the form

        // Find the product to get its name
        const product = await productModel.findById(productId);
        const productName = product.productName;

        // Create a new order
        await orderModel.create({
            userId: userId,
            userName: userName,
            userNumber: userNumber,
            userAddress: userAddress,
            userEmail: userEmail,
            productId: productId,
            productName: productName
        });

        res.redirect("order-confirm")
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while placing the order.");
    }
});

// DELETE route for deleting a product by ID
app.delete('/orders/:id', async (req, res) => {
    try {
        const ordersId = req.params.id;
        const deletedOrders = await orderModel.findByIdAndDelete(ordersId);
        if (deletedOrders) {
            res.status(200).redirect('/dashboad')
        } else {
            res.status(404).json({ message: 'order not found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting orders!' });
    }
});

app.get('/About',function(req,res){
    res.render('About');
})
app.get('/design',function(req,res){
    res.render('design');
})

app.get('/contact',function(req,res){
    res.render('contact');
})

app.get('/order-confirm',function(req,res){
    res.render('order-confirm');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
