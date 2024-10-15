import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import deploy from './deploy';
import Escrow from './Escrow';

const provider = new ethers.providers.Web3Provider(window.ethereum);

export async function approve(escrowContract, signer) {
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

function App() {
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  useEffect(() => {
    async function getAccounts() {
      const accounts = await provider.send('eth_requestAccounts', []);

      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  function buildEscrow(data, contract, signer) {
    return {
      ...data,
      handleApprove: async () => {
        contract.on('Approved', () => {
          document.getElementById(contract.address).className =
            'complete';
          document.getElementById(contract.address).innerText =
            "✓ It's been approved!";
        });

        await approve(contract, signer);
      }
    }
  }

  async function loadContract() {
    const address = document.getElementById('escrow-address').value;
    const { abi, bytecode } = await import("./artifacts/contracts/Escrow.sol/Escrow.json")
    const Escrow = new ethers.ContractFactory(abi, bytecode, signer);
    const escrowContract = Escrow.attach(address);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const beneficiary = await escrowContract.beneficiary();
    const arbiter = await escrowContract.arbiter();
    const value = (await provider
      .getBalance(escrowContract.address))
      .toString();

    const escrow = buildEscrow({
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value,
    }, escrowContract, signer);

    setEscrows([...escrows, escrow]);
  }

  async function newContract() {
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const amount = document.getElementById('amount').value;
    const denom = document.getElementById('denomination').value;
    const value = ethers.utils.parseUnits(amount.toString(), denom).toString();
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    const escrow = buildEscrow({
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value,
    }, escrowContract, signer);

    setEscrows([...escrows, escrow]);
  }

  return (
    <>
      <Container>
        <Box className="header">
          <Typography variant="h4" component="h1">
            Alchemy University - Escrow Contract
          </Typography>
          <Typography variant="h5" component="h4">
            Week 7 Challenge
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={{ xs: 6, sm: 6, md: 12 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <div className="contract">
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                  New Contract
                </Typography>
                <label>
                  Arbiter Address
                  <input type="text" id="arbiter"/>
                </label>

                <label>
                  Beneficiary Address
                  <input type="text" id="beneficiary"/>
                </label>

                <label>
                  Deposit Amount
                  <input type="text" id="amount"/>
                </label>

                <label>
                  <select id="denomination">
                    <option value="ether">Eth</option>
                    <option value="gwei">Gwei</option>
                    <option value="wei">Wei</option>
                  </select>
                </label>
                <div
                  className="button"
                  id="deploy"
                  onClick={(e) => {
                    e.preventDefault();

                    newContract();
                  }}
                >
                  Deploy
                </div>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 8 }}>
              <div className="existing-contracts">
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                  Existing Contracts
                </Typography>

                <div>
                  <label>
                    <input type="text" id="escrow-address" placeholder="escrow address"/>
                  </label>
                  <div
                    className="button"
                    id="load-escrow"
                    onClick={(e) => {
                      e.preventDefault();

                      loadContract();
                    }}
                  >
                    Load Escrow
                  </div>
                </div>

                <div id="escrow-list">
                  {escrows.length && escrows.map((escrow) => {
                    return <Escrow key={escrow.address} {...escrow} />;
                  })}
                  {!escrows.length && (
                    <p>No escrows</p>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;
