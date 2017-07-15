const generateMessage = (from, content) => {
    return {
        from,
        content,
        createdAt: new Date().getTime()
    };
}

module.exports = { generateMessage };