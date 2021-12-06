const express = require('express');

const mongoose = require('mongoose');
const Product = mongoose.model('product');
const Admin = mongoose.model('admins');

const router = express.Router();

const PAGE_SIZE = 4;

router.get("/",(req,res)=>{
    res.render("addOredit",{
        viewTitle:"Product"
    })
})

router.post("/",(req,res)=>{
    if(req.body._id == ""){
        insertRecord(req,res);
    }else{
        updateRecord(req,res);
    }
})

router.get("/login",(req,res)=>{
    res.render("loginadmin");
})



function insertRecord(req,res){
    const product = new Product();
    const admins = new Admin();

    product.productid = req.body.productid;
    product.price = req.body.price;
    product.image = req.body.image;
    product.image1 = req.body.image1;
    product.detail = req.body.detail;
    product.type = req.body.type;
    product.name = req.body.name;
    product.brand = req.body.brand;
    product.color = req.body.color;
    product.discount = req.body.discount;

    product.save((err, doc) => {
        if (!err) {
            res.redirect('table');
        } else {
            if (err.name == "ValidationError") {
                handleValidationError(err, req.body);
                res.render("addOredit", {
                    viewTitle: 'Update Product',
                    product: req.body
                })
            }
            console.log("Error Insert" + err);
        }
    });

    admins.username = req.body.username;
    admins.adminname = req.body.adminname;
    admins.number = req.body.number;



}
function  updateRecord(req,res){
    Product.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc)=>{
        if (!err){
            res.redirect("table");
        }else{

            if(err.name == "ValidationError"){
                handleValidationError(err,req.body);
                res.render("addOredit",{
                    viewTitle:'Update Product',
                    product:req.body
                })
            }
            console.log("Error Update"+err);

        }
    })

}

router.get('/table',(req,res)=>{

    var page = req.query.page;

    if(page) {
        page = parseInt(page);
        if (page < 1){page = 1;}

        var skip = (page - 1) * PAGE_SIZE;

        Product.find((err,docs)=>{
            if (!err){
                res.render("table",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();

    }else{
        page = 1;
        var skip = (page - 1) * PAGE_SIZE;

        Product.find((err,docs)=>{
            if (!err){
                res.render("table",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();
    }
})

router.get('/admins',(req,res)=>{

    var page = req.query.page;

    if(page) {
        page = parseInt(page);
        if (page < 1){page = 1;}

        var skip = (page - 1) * PAGE_SIZE;

        Admin.find((err,docs)=>{
            if (!err){
                res.render("admins",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();

    }else{
        page = 1;
        var skip = (page - 1) * PAGE_SIZE;

        Admin.find((err,docs)=>{
            if (!err){
                res.render("admins",{
                    list:docs
                })
            }
        }).skip(skip).limit(PAGE_SIZE).lean();
    }
})

router.get('/:id',(req,res)=>{
    Product.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("addOredit",{
                viewTitle:"Update Product",
                product:doc
            })
        }
    })
})


router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/table')
        }else{
            console.log("An error Teh Delete "+ err);
        }
    })

})


module.exports = router;