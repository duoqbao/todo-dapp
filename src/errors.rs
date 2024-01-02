use anchor_lang::prelude::*;

#[error_code]
pub enum TodoError {
    #[msg("You'r not authorized to perform this action")]
    Unauthorized,

    #[msg("Not allowed")]
    NotAllowed,

    #[msg("Math operation overflow")]
    MathOverflow,

    #[msg("Already marked")]
    AlreadyMarked,
}
