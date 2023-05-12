export default () => ({
	db: process.env.DATABASE_CONNECTION,
	secret: process.env.JWT_SECRET,
	open_api_title: 'Nestjs Project',
	open_api_version: '1',
	swagger_path: 'nest-new-your-app',
	port: process.env.PORT || 8080,
});
