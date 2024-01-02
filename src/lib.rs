use anchor_lang::prelude::*;

pub mod constants;
pub mod errors;
pub mod states;
use crate::{constants::*, errors::*, states::*};

declare_id!("CHDPdk9UzhiKVJDJ2imEb93MxVgiGxbDUDQdpL2eUQaX");

#[program]
pub mod todo_app {
    // initialize User
    // add a User Profile to blockchain
    // Add values for default data
    use super::*;

    pub fn initialize_user(_ctx: Context<InitializeUser>) -> Result<()> {
        // write logic initialize user with default data
        let user_profile = &mut _ctx.accounts.user_profile;
        user_profile.authority = _ctx.accounts.authority.key();
        user_profile.last_todo = 0;
        user_profile.todo_count = 0;

        Ok(())
    }

    // add todo

    pub fn add_todo(_ctx: Context<AddTodo>, _content: String) -> Result<()> {
        // write logic here

        let todo_account = &mut _ctx.accounts.todo_account;
        let user_profile = &mut _ctx.accounts.user_profile;

        todo_account.authority = _ctx.accounts.authority.key();
        todo_account.idx = user_profile.last_todo;
        todo_account.content = _content;
        todo_account.marked = false;

        // increase todo idx for PDA

        user_profile.last_todo = user_profile.last_todo.checked_add(1).unwrap();

        // increase total todo account
        user_profile.todo_count = user_profile.todo_count.checked_add(1).unwrap();

        Ok(())
    }

    // mark todo
    pub fn mark_todo(_ctx: Context<MarkTodo>, todo_idx: u8) -> Result<()> {
        let todo_account = &mut _ctx.accounts.todo_account;

        require!(!todo_account.marked, TodoError::AlreadyMarked);

        todo_account.marked = true;
        Ok(())
    }
    // delete todo
    pub fn remove_todo(_ctx: Context<RemoveTodo>, todo_idx: u8) -> Result<()> {
        let user_profile = &mut _ctx.accounts.user_profile;
        user_profile.todo_count = user_profile.todo_count.checked_sub(1).unwrap();

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds=[USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct AddTodo<'info> {
    #[account(
        mut,
        seeds=[USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init, 
        seeds = [TODO_TAG, authority.key().as_ref(),&[user_profile.last_todo as u8].as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<TodoAccount>() + 8,
    )]
    pub todo_account: Box<Account<'info, TodoAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(todo_idx: u8)]
pub struct MarkTodo<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [TODO_TAG, authority.key().as_ref(), &[todo_idx].as_ref()],
        bump,
        has_one = authority
    )]
    pub todo_account: Box<Account<'info, TodoAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(todo_idx: u8)]
pub struct RemoveTodo<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        close = authority,
        seeds = [TODO_TAG, authority.key().as_ref(), &[todo_idx].as_ref()],
        bump, 
        has_one = authority
    )]
    pub todo_account: Box<Account<'info, TodoAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
