export const crearHash = async () => {
  var cadenaConcatenada =
    "sk8-438k4-xmxm392-sn2m2490000COPtest_integrity_wWyOC9FnCmscJ2SY3FVkhNK1dDc90L6H";
  //Ejemplo
  const encondedText = new TextEncoder().encode(cadenaConcatenada);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // "37c8407747e595535433ef8f6a811d853cd943046624a0ec04662b17bbf33bf5"

  return hashHex;
};
