use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Note {
    pub key: u8,
    pub length: u32,
}

impl From<(u8, u32)> for Note {
    fn from((key, length): (u8, u32)) -> Self {
        Self { key, length }
    }
}
