// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CampaignNFT is ERC721, Ownable {
    using Strings for uint256;
    
    string private _baseTokenURI;

    event NFTMinted(address indexed to, uint256 indexed tokenId);
    event NFTBurned(uint256 indexed tokenId);

    constructor() ERC721("CampaignNFT", "CNFT") Ownable(msg.sender) {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _mint(to, tokenId);
        emit NFTMinted(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
        emit NFTBurned(tokenId);
    }

    function setBaseTokenURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return bytes(_baseTokenURI).length > 0
            ? string(abi.encodePacked(_baseTokenURI, tokenId.toString(), ".json"))
            : "";
    }

    function getBaseTokenURI() public view returns (string memory) {
        return _baseTokenURI;
    }
}
