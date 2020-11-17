const router = require('express').Router();

router.get('/', (req, res) => {
	return res.render('index',{user:{}});
});

router.get('/hotels', (req, res) => {
	return res.render('hotels');
});

router.get('/about', (req, res) => {
	return res.render('about');
});

router.get('/contact', (req, res) => {
	return res.render('contact');
});

router.get('/giftcards', (req, res) => {
	return res.render('giftcards');
});

router.get('/partner', (req, res) => {
	return res.render('partner');
});

router.get('/refund', (req, res) => {
	return res.render('refund');
});

router.get('/terms', (req, res) => {
	return res.render('terms');
});


router.get('/user', (req, res) => {
	return res.render('admin/user');
});

router.get('/refer', (req, res) => {
	return res.render('refer');
});

router.get('/career', (req, res) => {
	return res.render('career');
});

router.get('/faq', (req, res) => {
	return res.render('faq');
});

router.get('/tours', (req, res) => {
	return res.render('tours');
});

router.get('/blogs', (req, res) => {
	return res.render('blogs');
});


router.get('/user/newblog', (req, res) => {
	return res.render('admin/Addblog');
});

router.get('/user/allblog', (req, res) => {
	return res.render('admin/Allblog');
})
router.get('/blog', (req, res) => {
	return res.render('blog');
development
});

router.get('/user/userdetail', (req, res) => {
	return res.render('admin/userdetail');
});

router.get('/packages', (req, res) => {
	return res.render('packages');
});

router.get('/forgot-password', (req, res) => {
	return res.render('forgot-password');
});

router.get('/user/offer', (req, res) => {
	return res.render('admin/alloffer');
});

router.get('/user/addoffer', (req, res) => {
	return res.render('admin/addoffers');
});

router.get('/user/hotelenquiry', (req, res) => {
	return res.render('admin/hotel-enquiry');
});

router.get('/user/eventsenquiry', (req, res) => {
	return res.render('admin/events-enquiry');
});

router.get('/profile', (req, res) => {
	return res.render('profile');
});
	
router.get('/user', (req, res) => {
	return res.render('admin/user');
});

router.get('/user/all-packages', (req, res) => {
	return res.render('admin/all-packages');
});

router.get('/user/all-package-category', (req, res) => {
	return res.render('admin/all-package-category');
});

router.get('/user/add-package', (req, res) => {
	return res.render('admin/add-package');

});

router.get('/user/add-package-category', (req, res) => {
	return res.render('admin/add-package-category');
});

router.get('/user/booking', (req, res) => {
	return res.render('admin/booking');
});
router.get('/user/bookings', (req, res) => {
	return res.render('admin/enquiry');
});

router.get('/user/addDiscount',(req,res) => {
	return res.render('admin/addDiscount');
});

router.get('/user/allDiscounts',(req,res) => {
	return res.render('admin/allDiscounts');
});

router.get('/user/all-room-type', (req, res) => {
	return res.render('admin/all-room-type');
});

router.get('/user/add-room-type', (req, res) => {
	return res.render('admin/add-room-type');
});

router.get('/user/add-hotel', (req, res) => {
	return res.render('admin/add-hotel');
});

router.get('/user/all-hotels', (req, res) => {
	return res.render('admin/all-hotels');
});

module.exports = router;
