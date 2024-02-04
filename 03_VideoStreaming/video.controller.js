// controllers/videoController.js
const Video = require('../models/video');


// Controller for uploading a new video
exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, url } = req.body;
        const video = new Video({ title, description, url });
        await video.save();
        res.status(201).json(video);  

    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}


// Controller for getting all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos)

    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}


// Controller for getting a single video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if(!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        res.json(video)

    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}

// Controller for updating a video
exports.updateVideo = async (req, res) => {
    try {
        const { title, description, url } = req.body;
        const video = await Video.findById(req.params.id);  // find the video by ID
        if(!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
         // update the properties of the found video with the new values
         video.title = title;
         video.description = description;
         video.url = url;
         // save the updated video to database
         await video.save();
         res.json(video);

    } catch (error) {
        res.status(400).json({message: error.message});        
    }
}


// Controller for deleting a video
exports.deleteVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);    
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });        
        }
        await video.remove();
        res.json({ message: 'Video deleted successfully' });

    } catch (error) {
        res.status(500).json({message: error.message});         
    }
}