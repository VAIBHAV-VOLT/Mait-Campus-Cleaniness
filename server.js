const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5500;

app.use(cors());
app.use(express.json());
app.use(express.static('./'));

// API endpoint to add a new champion
app.post('/api/add-champion', (req, res) => {
    try {
        const { name, highlight, quote, linkedin, image } = req.body;

        // Validate required fields
        if (!name || !highlight || !quote) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        // Read current champions.js file
        const dataPath = path.join(__dirname, 'data', 'champions.js');
        let fileContent = fs.readFileSync(dataPath, 'utf8');

        // Create new champion object
        const newChampion = {
            name: name,
            highlight: highlight,
            quote: quote,
            linkedin: linkedin || '',
            image: image || 'images/champions/default.jpg',
            show: true
        };

        // Find the closing bracket and insert before it
        const lastBracketIndex = fileContent.lastIndexOf(']');
        
        if (lastBracketIndex === -1) {
            throw new Error('Invalid champions.js format');
        }

        // Check if array is empty or has content
        const arrayContent = fileContent.substring(
            fileContent.indexOf('[') + 1, 
            lastBracketIndex
        ).trim();

        // Format champion object as proper JavaScript object literal (unquoted keys)
        const formattedChampion = `{ name: "${newChampion.name}", highlight: "${newChampion.highlight}", quote: "${newChampion.quote}", linkedin: "${newChampion.linkedin}", image: "${newChampion.image}", show: ${newChampion.show} }`;

        let newContent;
        if (arrayContent === '') {
            // Empty array
            newContent = fileContent.substring(0, lastBracketIndex) + 
                        '\n  ' + formattedChampion + 
                        fileContent.substring(lastBracketIndex);
        } else {
            // Array has content, add comma
            newContent = fileContent.substring(0, lastBracketIndex) + 
                        ',\n  ' + formattedChampion + 
                        fileContent.substring(lastBracketIndex);
        }

        // Write updated content back to file
        fs.writeFileSync(dataPath, newContent, 'utf8');

        return res.json({
            success: true,
            message: 'Champion added successfully!',
            champion: newChampion
        });

    } catch (error) {
        console.error('Error adding champion:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to add champion', 
            details: error.message 
        });
    }
});

// Serve the app
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Access add-champions.html at http://localhost:${PORT}/add-champions.html`);
});
