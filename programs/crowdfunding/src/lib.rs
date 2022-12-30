use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod crowdfunding {
    use super::*;

    /* Context is a list of the accounts that the program will interact with */
    pub fn create(ctx: Context<Create>, name: String, description: String) -> Result<()> {}
}
