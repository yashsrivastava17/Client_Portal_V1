
  # Crenoir X MAP Client Portal

  This is a code bundle for Crenoir X MAP Client Portal. The original project is available at https://www.figma.com/design/lSTUMDNMtxGk2D2g9wX3wf/Crenoir-X-MAP-Client-Portal.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

## Contracts: Figma Make ↔ Backend Integration

This project includes a lightweight contracts system to keep Figma Make (design/flow) in sync with frontend and backend integration.

- `contracts/schema.json`: JSON Schema defining a contract between UI and backend.
- `contracts/templates/component-contract.template.yaml`: Template for new component contracts.
- `contracts/examples/google-sign-in.yaml`: Example contract for `GoogleSignIn`.
- `scripts/validate-contracts.mjs`: Script to validate all contracts.

### Install tools

```bash
npm i -D ajv ajv-formats yaml glob
```

### Validate contracts

```bash
npm run validate:contracts
```

### Workflow

1. Designers (Figma Make) propose or update a contract YAML per component/feature.
2. Frontend implements against the contract. Backend ensures endpoints/events/fields exist.
3. Any change that requires backend work is captured in `backendImpacts` with actions/tickets.
4. Validation ensures contract structure is consistent and linkable across repos.

See `src/guidelines/Backend-Integration-Map.md` for mapping patterns.
  