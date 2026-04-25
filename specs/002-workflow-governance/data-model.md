# Data Model: Workflow Governance Tightening

## Entities

### Phase Slice

- **Purpose**: A non-trivial planning or execution unit that requires its own scope confirmation.
- **Key Fields**:
  - `name`
  - `scope`
  - `spec_status`
  - `approval_status`
  - `entry_criteria`
  - `exit_criteria`

### Specialist Planning Pass

- **Purpose**: A named contribution from one `agent-*` role during planning.
- **Key Fields**:
  - `agent_role`
  - `scope`
  - `result_summary`
  - `skip_reason` (optional)
  - `sequence_order`

### Specialist-Owned Task Block

- **Purpose**: A sequential group of tasks assigned to one specialist scope.
- **Key Fields**:
  - `owner_role`
  - `task_ids`
  - `sequence_order`
  - `depends_on`
  - `conflict_notes`

### Execution Exception

- **Purpose**: A user-approved deviation from sequential execution.
- **Key Fields**:
  - `exception_type`
  - `user_approval_reference`
  - `scope`
  - `reason`

## Relationships

- A `Phase Slice` contains one or more `Specialist Planning Pass` records.
- A `Phase Slice` produces one or more `Specialist-Owned Task Block` records.
- An `Execution Exception` may apply to a `Phase Slice` when the user explicitly approves concurrency.
