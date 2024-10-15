import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(ethereum);

export default async function addContract(
  id,
  contract,
  arbiter,
  beneficiary,
  value
) {
  const buttonId = `approve-${id}`;

  const escrowList = document.getElementById('escrow-list');
  escrowList.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

  contract.on('Approved', () => {
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  document.getElementById(buttonId).addEventListener('click', async () => {
    const signer = provider.getSigner();
    await contract.connect(signer).approve();
  });
}

function createHTML(buttonId, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <h4>button: ${buttonId}</h4>
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value in wei </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
