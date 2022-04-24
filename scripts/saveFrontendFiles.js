export default saveFrontendFiles = (minter) => {
    const fs = require("fs");
    const contractsDir = __dirname + "/../frontend/src/contracts";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ VerifyWinner: minter.address }, "", 2)
    );
  
    const MinterArtifact = artifacts.readArtifactSync("VerifyWinner");
  
    fs.writeFileSync(
      contractsDir + "/VerifyWinner.json",
      JSON.stringify(MinterArtifact, "", 2)
    );
  }