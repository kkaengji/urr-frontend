export const artistGradients: Record<string, string> = {
  "1":  "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  "2":  "linear-gradient(135deg, #4a0e4e 0%, #2b1055 50%, #7597de 100%)",
  "3":  "linear-gradient(135deg, #0d7377 0%, #0a5c5e 50%, #083d3f 100%)",
  "4":  "linear-gradient(135deg, #e8739e 0%, #c94c78 50%, #a62d5c 100%)",
  "5":  "linear-gradient(135deg, #ff006e 0%, #1a1a1a 50%, #ff006e 100%)",
  "6":  "linear-gradient(135deg, #1a1a1a 0%, #c70039 50%, #1a1a1a 100%)",
  "7":  "linear-gradient(135deg, #f7971e 0%, #e8891a 50%, #d47b16 100%)",
  "8":  "linear-gradient(135deg, #4a7fb5 0%, #3a6a9e 50%, #2b5587 100%)",
  "9":  "linear-gradient(135deg, #6a0572 0%, #ab83a1 50%, #6a0572 100%)",
  "10": "linear-gradient(135deg, #00b4d8 0%, #0077b6 50%, #023e8a 100%)",
  "11": "linear-gradient(135deg, #2d5016 0%, #4a7c23 50%, #2d5016 100%)",
  "12": "linear-gradient(135deg, #264653 0%, #2a9d8f 50%, #264653 100%)",
  "13": "linear-gradient(135deg, #2c2c54 0%, #474787 50%, #2c2c54 100%)",
  "14": "linear-gradient(135deg, #3d5a80 0%, #98c1d9 50%, #3d5a80 100%)",
  "15": "linear-gradient(135deg, #e63946 0%, #457b9d 50%, #1d3557 100%)",
  "16": "linear-gradient(135deg, #b5838d 0%, #e5989b 50%, #b5838d 100%)",
  "17": "linear-gradient(135deg, #7b2d8b 0%, #d63384 50%, #7b2d8b 100%)",
};

export function getArtistGradient(artistId: string): string {
  return (
    artistGradients[artistId] ??
    "linear-gradient(135deg, #374151 0%, #6b7280 100%)"
  );
}
