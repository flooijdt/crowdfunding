use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod crowdfunding {
    use super::*;

    /* Context is a list of the accounts that hold the data that will be used by the program.
    Remember that programs cannot hold data!  */
    pub fn create(ctx: Context<Create>, name: String, description: String) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *ctx.accounts.user.key;
        Ok(())
    }

    /* Allows the admin to withdraw funds from his campaign */
    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {}
}
/* this derive indicates that we will declare a Context. */
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer=user, space=9000, seeds=[b"CAMPAIGN_DEMO".as_ref(),user.key().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}
/* This macro indicates that we will be creating an account */
#[account]
pub struct Campaign {
    pub admin: Pubkey,
    pub name: String,
    pub description: String,
    pub amount_donated: u64,
}
