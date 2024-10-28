const defaultTarget = 'https://api.igdb.com/v4';
module.exports = [
    {
       context: ['/games', '/genres', '/platforms', '/release_dates'],
       target: defaultTarget,
       changeOrigin: true,
    }
    ]