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

router.get('/packages', (req, res) => {
	return res.render('packages');
});

router.get('/forgot-password', (req, res) => {
	return res.render('forgot-password');
});

router.get('/admin', (req, res) => {
	return res.render('admin');
});

router.get('/admin/all-packages', (req, res) => {
	return res.render('all-packages');
});

module.exports = router;
