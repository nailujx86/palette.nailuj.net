let env = process.env;

module.exports = {
 url: "mongodb://"+env.DATABASE_USER+":"+env.DATABASE_PASSWORD+"@"+env.DATABASE_URL+"/"+env.DATABASE_NAME+env.DATABASE_ADDITIONAL
}