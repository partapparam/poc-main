import axios from 'axios';

const fetchSemantic = async (req, res) => {
    const { fetchingData } = req.body;
    // console.log(fetchingData, "fetchingData");
    // console.log(req, "Requestttt");

    try {
        const config = {
            method: 'POST',
            url:  'http://18.205.23.239:81/send',
            data: JSON.stringify(fetchingData),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        
        const response = await axios.request(config);
    
        const responseData = response.data;
    
        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: error, message: 'Server down, please try after sometime' });
    }
};

export default fetchSemantic;