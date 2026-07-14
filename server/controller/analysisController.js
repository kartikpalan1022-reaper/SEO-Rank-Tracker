import analysisModel from "../models/analysisModel.js";
import { analyzeSeoData } from "../services/geminiService.js";
import { scrapeUrl } from "../services/scraperService.js";


// Analyze a URL
export const analyzeUrl = async(req,res)=>{
    try{
        const { url } = req.body;
        if(!url) return res.status(400).json({success:false,message:"URL is required"});

        // Validate URL format
        let validUrl;
        try{
            validUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
        }
        catch(error){
            return res.status(400).json({success:false,message:"Invalid URL format"});
        }

        // Create analysis record with pending status
        const analysis = await analysisModel.create({userId:req.userId, url:validUrl.href, status:"processing"});

        // Send immediate response with analysis ID
        res.json({success:true,message:"Analysis started", analysisId:analysis._id});

        // Run Scraping and analysis in background
        try{
            // S1: Scrape the URL with BrowserBase
            const scrapeResult = await scrapeUrl(validUrl.href);
            if(!scrapeResult.success){
                analysis.status = "failed";
                await analysis.save();
                return;
            }

            // S2: Analyze with Gemini AI
            const aiResult = await analyzeSeoData(scrapeResult.data);
            if(!aiResult.success){
                analysis.status = "failed";
                await analysis.save();
                return;
            }

            // S3: Save the result
            analysis.overallScore = aiResult.data.overallScore || 0;
            analysis.categories = aiResult.data.categories || {};
            analysis.metaData = scrapeResult.data.metaData || {};
            analysis.headings = scrapeResult.data.headings || {};
            analysis.links = scrapeResult.data.links || {};
            analysis.images = scrapeResult.data.images || {};
            analysis.keywords = aiResult.data.keywords || [];
            analysis.issues = aiResult.data.issues || [];
            analysis.loadTime = scrapeResult.data.loadTime || 0;
            analysis.pageSize = scrapeResult.data.pageSize || 0;
            analysis.wordCount = scrapeResult.data.wordCount || 0;
            analysis.status = "completed";
            await analysis.save();

        }
        catch(bgError){
            console.error("Background Analysis error:",bgError.message);
            try{
                analysis.status = "failed";
                await analysis.save();
            }
            catch(saveError){
                console.error("Failed to save failed status:",saveError.message);
            }
        }

    }
    catch(error){
        console.error("Analyze URL error:",error.message);
        if(!res.headersSent){
            res.status(500).json({success:false,message:"Server Error"});
        }
    }
}

// Get analysis by ID
export const getAnalysis = async(req,res)=>{
    try{
        const analysis = await analysisModel.findOne({_id: req.params.id, userId: req.userId}); 
        if(!analysis) return res.status(400).json({success:false,message:"Analysis not found"});

        res.json({success:true,analysis})
    }
    catch(error){
        console.error("Get analysis error:",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
}

// Get all analyses for user
export const getAnalyses = async(req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page-1) * limit;

        const analyses = await analysisModel.find({userId: req.userId}).sort({createdAt:-1}).skip(skip).limit(limit).select("-issues -keywords"); 

        const total = await analysisModel.countDocuments({userId: req.userId});

        res.json({success:true,analyses,pagination:{page,limit,total,pages:Math.ceil(total/limit)}})
    }
    catch(error){
        console.error("Get analyses error:",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
}

// Delete analysis
export const deleteAnalysis = async(req,res)=>{
    try{
        await analysisModel.findByIdAndDelete({_id: req.params.id, userId: req.userId}); 
        res.json({success:true,message:"Analysis Deleted"})
    }
    catch(error){
        console.error("Delete analysis error:",error.message);
        res.status(500).json({success:false,message:"Server error"});
    }
}