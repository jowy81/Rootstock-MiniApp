#!/usr/bin/env node

/**
 * Script to update NFT metadata files with actual IPFS CIDs
 * 
 * Usage:
 *   node update-metadata-cids.js <IMAGES_CID>
 * 
 * Example:
 *   node update-metadata-cids.js QmXxx123...
 */

const fs = require('fs');
const path = require('path');

const METADATA_DIR = path.join(__dirname, 'metadata');

function updateMetadataCIDs(imagesCID) {
    if (!imagesCID) {
        console.error('❌ Error: Please provide the IMAGES_CID as an argument');
        console.log('\nUsage: node update-metadata-cids.js <IMAGES_CID>');
        console.log('Example: node update-metadata-cids.js QmXxx123...\n');
        process.exit(1);
    }

    console.log(`🔄 Updating metadata files with IMAGES_CID: ${imagesCID}\n`);

    // Get all JSON files in metadata directory
    const files = fs.readdirSync(METADATA_DIR).filter(f => f.endsWith('.json'));

    let updatedCount = 0;

    files.forEach(file => {
        const filePath = path.join(METADATA_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');

        // Replace IMAGES_CID placeholder with actual CID
        const updatedContent = content.replace(/IMAGES_CID/g, imagesCID);

        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`✅ Updated: ${file}`);
            updatedCount++;
        } else {
            console.log(`⏭️  Skipped: ${file} (already updated or no placeholder found)`);
        }
    });

    console.log(`\n✨ Done! Updated ${updatedCount} file(s)`);
    console.log('\n📋 Next steps:');
    console.log('1. Upload the metadata/ folder to Pinata as a DAG');
    console.log('2. Copy the METADATA_CID');
    console.log('3. Update deploy-enhanced.ts with: ipfs://METADATA_CID/');
    console.log('4. Deploy the contract\n');
}

// Get CID from command line argument
const imagesCID = process.argv[2];
updateMetadataCIDs(imagesCID);
