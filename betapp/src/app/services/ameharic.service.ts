import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoaclstoarageService } from './loaclstoarage.service';

@Injectable({
  providedIn: 'root'
})
export class AmeharicService {

  private _baseUploadUrl = environment.baseurl + 'Ameharic/';

  private AmeharicJsonFile: any = [
    {
      "id": "00a98f7fed184871954b116ea6de2b9a",
      "amharicAlph": "ቫ",
      "englishSound": "va"
    },
    {
      "id": "00c4e30aa14b4927b10ae42374b8c9b7",
      "amharicAlph": "ሧ",
      "englishSound": "szaa"
    },
    {
      "id": "02eb3b5a4dee49408745a0b3d34165ff",
      "amharicAlph": "ፁ",
      "englishSound": "tzu"
    },
    {
      "id": "038dd7c3255f4711970dfe1bfba54076",
      "amharicAlph": "ዕ",
      "englishSound": "ə"
    },
    {
      "id": "03dd5b7c2cc44fecaab6073d558eecc4",
      "amharicAlph": "ሮ",
      "englishSound": "ro"
    },
    {
      "id": "0613a809c6b0479ea85a83c10816b686",
      "amharicAlph": "እ",
      "englishSound": "ə"
    },
    {
      "id": "06d3164444904ad6a4efe8253c41f0a8",
      "amharicAlph": "ጠ",
      "englishSound": "the"
    },
    {
      "id": "0783f8e26319472eaf417f88a344f980",
      "amharicAlph": "ር",
      "englishSound": "r"
    },
    {
      "id": "08e9f3705831466bb789268ea4dfe9c2",
      "amharicAlph": "ሯ",
      "englishSound": "raa"
    },
    {
      "id": "093f4b97c45847c2a828c95c547370ca",
      "amharicAlph": "ነ",
      "englishSound": "ne"
    },
    {
      "id": "0a13db68cea743a09ba33b6633f55882",
      "amharicAlph": "ጁ",
      "englishSound": "ju"
    },
    {
      "id": "0a9632e8f36746d283f0ab39e6675185",
      "amharicAlph": "ዓ",
      "englishSound": "a"
    },
    {
      "id": "0b04485d5d334fa59977fe0f10d339dc",
      "amharicAlph": "ኄ",
      "englishSound": "Xee"
    },
    {
      "id": "0b5432d29ed041bda447fe5e141c2b0f",
      "amharicAlph": "ጺ",
      "englishSound": "tsi"
    },
    {
      "id": "0c15f97c7ac54f98911fbfce8fced12c",
      "amharicAlph": "ቪ",
      "englishSound": "vi"
    },
    {
      "id": "0c240e068b6a46c8b5cd267979be2313",
      "amharicAlph": "ኌ",
      "englishSound": "Xwee"
    },
    {
      "id": "0d90cf4a0ffb4c67bc2119d3ab53f6f5",
      "amharicAlph": "ራ",
      "englishSound": "ra"
    },
    {
      "id": "0f0baa3e09dc46d9868c5602a496fd21",
      "amharicAlph": "ሦ",
      "englishSound": "szo"
    },
    {
      "id": "0f96bfa2844d4498be6c5b039064f8ed",
      "amharicAlph": "ዖ",
      "englishSound": "o"
    },
    {
      "id": "10997c4e486548899bc2c2f712332b82",
      "amharicAlph": "ኊ",
      "englishSound": "Xwi"
    },
    {
      "id": "118ada3ac03f414e9affb6d3c80694f8",
      "amharicAlph": "ሽ",
      "englishSound": "sh"
    },
    {
      "id": "1301c1f85d7241d89d747cd43bb61950",
      "amharicAlph": "ኇ",
      "englishSound": "Xaa"
    },
    {
      "id": "131e993fe0df41688d08c84a50e45608",
      "amharicAlph": "ሊ",
      "englishSound": "li"
    },
    {
      "id": "1421e262cf27495ea5e27be2ddd40fec",
      "amharicAlph": "ሒ",
      "englishSound": "Hi"
    },
    {
      "id": "149d6b4e0faf4d579afdbef28e109e9e",
      "amharicAlph": "ሼ",
      "englishSound": "shee"
    },
    {
      "id": "14b37b550119411ab8803037e73a0e2a",
      "amharicAlph": "ል",
      "englishSound": "l"
    },
    {
      "id": "14fa3546188e48839902b621bc562d71",
      "amharicAlph": "ማ",
      "englishSound": "ma"
    },
    {
      "id": "15d95ce36b28465ea008d28df9d08e6c",
      "amharicAlph": "ፊ",
      "englishSound": "fi"
    },
    {
      "id": "165073c1c819484ebe1dd8e03be907a0",
      "amharicAlph": "ሲ",
      "englishSound": "si"
    },
    {
      "id": "1bd06b2bf9c0416fb13962592ea10580",
      "amharicAlph": "ሕ",
      "englishSound": "H"
    },
    {
      "id": "1ca657baad164f26a6baa25c919bdade",
      "amharicAlph": "ሺ",
      "englishSound": "shi"
    },
    {
      "id": "1eaa7e164f4e492687ea9dd5b3a97d4b",
      "amharicAlph": "ፌ",
      "englishSound": "fee"
    },
    {
      "id": "1f783eb5f99b4e1b8c0bd05cf8f6af8b",
      "amharicAlph": "ዤ",
      "englishSound": "zhee"
    },
    {
      "id": "216d431c0ec441c3823396544fc0cd1b",
      "amharicAlph": "ቸ",
      "englishSound": "ce"
    },
    {
      "id": "21e17c72dd8f47b6b01917e43069b78b",
      "amharicAlph": "ሓ",
      "englishSound": "Ha"
    },
    {
      "id": "223f5c9925d7446195c5e7e2e0218a95",
      "amharicAlph": "ሜ",
      "englishSound": "mee"
    },
    {
      "id": "2251f77b0bad41f1ae2762d6e20ab0b5",
      "amharicAlph": "ዡ",
      "englishSound": "zhu"
    },
    {
      "id": "2381cec70e32403a97177f89d764a10e",
      "amharicAlph": "ሌ",
      "englishSound": "lee"
    },
    {
      "id": "25b93d0cd2664c688d54444a328280ab",
      "amharicAlph": "ጀ",
      "englishSound": "je"
    },
    {
      "id": "270facc2c60f4670b05f1d82ca9c2bf6",
      "amharicAlph": "ዅ",
      "englishSound": "xw"
    },
    {
      "id": "27ac007b8f18484b864fca0e9559658e",
      "amharicAlph": "ዛ",
      "englishSound": "za"
    },
    {
      "id": "291328d419b3431482c5a404d6a59e38",
      "amharicAlph": "ዀ",
      "englishSound": "xwe"
    },
    {
      "id": "296c2874b0b546b2bb91e00b2fc92362",
      "amharicAlph": "ጎ",
      "englishSound": "go"
    },
    {
      "id": "2b4f1499e678468eaeacf7f10af3e77f",
      "amharicAlph": "ጻ",
      "englishSound": "tsa"
    },
    {
      "id": "2c70876af3304038bb74ab3871d94fe4",
      "amharicAlph": "ኰ",
      "englishSound": "kwe"
    },
    {
      "id": "2c82cba240a04869832311d933990c9a",
      "amharicAlph": "ን",
      "englishSound": "n"
    },
    {
      "id": "2eb1109caee74dfa8f2d881364decc45",
      "amharicAlph": "ፉ",
      "englishSound": "fu"
    },
    {
      "id": "2f1a98c1b42442bcaa76d7adc232d682",
      "amharicAlph": "ጣ",
      "englishSound": "tha"
    },
    {
      "id": "2fabe70c0b9f42ccb5b6803d934e652f",
      "amharicAlph": "ቦ",
      "englishSound": "bo"
    },
    {
      "id": "32a803ec837a49859454bac41865de12",
      "amharicAlph": "ጼ",
      "englishSound": "tsee"
    },
    {
      "id": "3307eae8d71244b1acce4202f473b795",
      "amharicAlph": "፣",
      "englishSound": "comma"
    },
    {
      "id": "332ed9ce0fb74170920a466188893574",
      "amharicAlph": "ጨ",
      "englishSound": "che"
    },
    {
      "id": "334b78ca263f4166ad4f509b79a0016c",
      "amharicAlph": "ጉ",
      "englishSound": "gu"
    },
    {
      "id": "33a21bd5c1254c8180eeee6a158e0ba5",
      "amharicAlph": "ኅ",
      "englishSound": "X"
    },
    {
      "id": "350fa63eb1fa41e8afccd5f83d16fafd",
      "amharicAlph": "ገ",
      "englishSound": "ge"
    },
    {
      "id": "3534fa9651eb4cb69f4aff9a0cfac703",
      "amharicAlph": "ኗ",
      "englishSound": "naa"
    },
    {
      "id": "35bb0bd91b0a478b8872496556967dc3",
      "amharicAlph": "ኬ",
      "englishSound": "kee"
    },
    {
      "id": "393af4a59f244654910335aaad896be8",
      "amharicAlph": "ኑ",
      "englishSound": "nu"
    },
    {
      "id": "39557b7a2c734690b170d2e77c899680",
      "amharicAlph": "ፐ",
      "englishSound": "pe"
    },
    {
      "id": "3a94d6b5c5e947e9a638ae505224b992",
      "amharicAlph": "ጃ",
      "englishSound": "ja"
    },
    {
      "id": "3aef1fa846c346ce95522a1c48fcf87b",
      "amharicAlph": "ሐ",
      "englishSound": "He"
    },
    {
      "id": "3ba0ed843f15465ba3c17cf13e76ee1c",
      "amharicAlph": "ቱ",
      "englishSound": "tu"
    },
    {
      "id": "3e1ed8e923e44ca28e9415fcd1fc1977",
      "amharicAlph": "ኹ",
      "englishSound": "xu"
    },
    {
      "id": "3e4d9b1ed13b4abeb138d5fd4526ffd9",
      "amharicAlph": "ፓ",
      "englishSound": "pa"
    },
    {
      "id": "3eb40a49899d428f9874361ab80c4b68",
      "amharicAlph": "ጶ",
      "englishSound": "pho"
    },
    {
      "id": "40fa66a5baff41008782388b919378a8",
      "amharicAlph": "፡",
      "englishSound": "wordspace"
    },
    {
      "id": "411f15a39d2e49e69b8cb71efcce03cf",
      "amharicAlph": "ጩ",
      "englishSound": "chu"
    },
    {
      "id": "42f8727e767f451d843b0b3e2d5c2b96",
      "amharicAlph": "ዚ",
      "englishSound": "zi"
    },
    {
      "id": "44c324b9a1184e2a98c95ced9aa52bf8",
      "amharicAlph": "ያ",
      "englishSound": "ya"
    },
    {
      "id": "463e1ca9c20442dda88a6884dac59629",
      "amharicAlph": "ተ",
      "englishSound": "te"
    },
    {
      "id": "469f6b71dfa54b97aef5f6897e8ba1fb",
      "amharicAlph": "ሿ",
      "englishSound": "shaa"
    },
    {
      "id": "47028fcf8cc54eb4924a66719ca4a9cc",
      "amharicAlph": "ዬ",
      "englishSound": "yee"
    },
    {
      "id": "4721818b25a74d16bd73531d2b967120",
      "amharicAlph": "ኻ",
      "englishSound": "xa"
    },
    {
      "id": "4816e42bb84e433ea696accb30678b72",
      "amharicAlph": "ዘ",
      "englishSound": "ze"
    },
    {
      "id": "4930cf63739c4097b26bcd4a499c7b74",
      "amharicAlph": "፠",
      "englishSound": "section mark"
    },
    {
      "id": "4953210851f54ea2b2d65205a42e6bde",
      "amharicAlph": "ይ",
      "englishSound": "y"
    },
    {
      "id": "4a613109768349f586c297073735632e",
      "amharicAlph": "ፔ",
      "englishSound": "pee"
    },
    {
      "id": "4b8ac62c16b448c8aed1df72d2639f84",
      "amharicAlph": "ጇ",
      "englishSound": "jaa"
    },
    {
      "id": "4c657bcb989c4884b4605f0b5e3598f3",
      "amharicAlph": "ሑ",
      "englishSound": "Hu"
    },
    {
      "id": "4d62ee8656ba48fb839b35fe1df9ccc1",
      "amharicAlph": "ቲ",
      "englishSound": "ti"
    },
    {
      "id": "4e17e22ee84a4a799027c65035de81c2",
      "amharicAlph": "ቧ",
      "englishSound": "baa"
    },
    {
      "id": "4e68171972b94bbe91e7fa1485f88102",
      "amharicAlph": "ሎ",
      "englishSound": "lo"
    },
    {
      "id": "4f9cda36b1724c6e9e959b11c183d01d",
      "amharicAlph": "ቴ",
      "englishSound": "tee"
    },
    {
      "id": "4feb8e064a1b448ca12632396db61269",
      "amharicAlph": "ድ",
      "englishSound": "d"
    },
    {
      "id": "504a8fd77fee47999f086e582b9e4b3f",
      "amharicAlph": "ቼ",
      "englishSound": "cee"
    },
    {
      "id": "5067a798e47d4282b55f7bd4814d68b3",
      "amharicAlph": "ዌ",
      "englishSound": "wee"
    },
    {
      "id": "507f4856a6c74201945b66e43af15b76",
      "amharicAlph": "ፆ",
      "englishSound": "tzo"
    },
    {
      "id": "5163fdcef93d4313bdf6007330bebf47",
      "amharicAlph": "ቋ",
      "englishSound": "qwa"
    },
    {
      "id": "51c4b1b303b74e4b948bf859aaa0fb78",
      "amharicAlph": "መ",
      "englishSound": "me"
    },
    {
      "id": "51ecac8134104b2b8ffdc95c241fcb5c",
      "amharicAlph": "ዜ",
      "englishSound": "zee"
    },
    {
      "id": "52f73d9c7be34c81a62708d4b5c890a8",
      "amharicAlph": "ቊ",
      "englishSound": "qwi"
    },
    {
      "id": "539a955976074aeca0b1e50db06d4c83",
      "amharicAlph": "ዴ",
      "englishSound": "dee"
    },
    {
      "id": "5429ad8ea5194d979e3ec10eab107a07",
      "amharicAlph": "በ",
      "englishSound": "be"
    },
    {
      "id": "54c36ea0004e430a8281a43fa14c004d",
      "amharicAlph": "ኵ",
      "englishSound": "kw"
    },
    {
      "id": "550b32c5e73348288999e5a0fb1e6608",
      "amharicAlph": "ቅ",
      "englishSound": "q"
    },
    {
      "id": "57748f61d8ae4a3e894509dd2626b4eb",
      "amharicAlph": "ዋ",
      "englishSound": "wa"
    },
    {
      "id": "57867738d4cf4ae0a88de8c84b5082a6",
      "amharicAlph": "ኍ",
      "englishSound": "Xw"
    },
    {
      "id": "58e2773a88094911a893081327eeef9a",
      "amharicAlph": "ፍ",
      "englishSound": "f"
    },
    {
      "id": "5b159030804d4ab69017aa86e0f95407",
      "amharicAlph": "ኺ",
      "englishSound": "xi"
    },
    {
      "id": "5bb52ea71e65441dadd6ab5bed9f5468",
      "amharicAlph": "ቍ",
      "englishSound": "qw"
    },
    {
      "id": "5dc958b0de16442abafb7b97eece4d62",
      "amharicAlph": "ሸ",
      "englishSound": "she"
    },
    {
      "id": "5dca3484d2e04181b0cb791f9e52dd45",
      "amharicAlph": "ዠ",
      "englishSound": "zhe"
    },
    {
      "id": "5e88fe2d06ae4fdfaf3dbacf7c12a567",
      "amharicAlph": "ሟ",
      "englishSound": "maa"
    },
    {
      "id": "5eb275c809fe4a93bed145e889410d59",
      "amharicAlph": "፧",
      "englishSound": "question mark"
    },
    {
      "id": "5fa68bcc21cc42a8b0923fda2c05c0a9",
      "amharicAlph": "ሃ",
      "englishSound": "ha"
    },
    {
      "id": "6056ee62bf66457488e4cedd7428a434",
      "amharicAlph": "ት",
      "englishSound": "t"
    },
    {
      "id": "62230d8df2cc43c5a4c104e4d95a6230",
      "amharicAlph": "ኂ",
      "englishSound": "Xi"
    },
    {
      "id": "62e3c218116a4ef6b38c712f8ec2876b",
      "amharicAlph": "ቇ",
      "englishSound": "qaa"
    },
    {
      "id": "64f5263d8065495fb0276ef44cd7f8c8",
      "amharicAlph": "ና",
      "englishSound": "na"
    },
    {
      "id": "6540baa3081c48439a1d2d134a469aed",
      "amharicAlph": "ኙ",
      "englishSound": "nyu"
    },
    {
      "id": "65fde1227e4f40639d4b00ae13086e88",
      "amharicAlph": "ኈ",
      "englishSound": "Xwe"
    },
    {
      "id": "6613446b24c54fb0bfee3c8018a24f1d",
      "amharicAlph": "ጅ",
      "englishSound": "j"
    },
    {
      "id": "6623b66829e94b0d8faee60b790f657d",
      "amharicAlph": "ሁ",
      "englishSound": "hu"
    },
    {
      "id": "66f2c824cabf4d36a18e3c6478f11e72",
      "amharicAlph": "ዥ",
      "englishSound": "zh"
    },
    {
      "id": "678d002457f34148afccaba8c0399379",
      "amharicAlph": "ቮ",
      "englishSound": "vo"
    },
    {
      "id": "68019ce808504757b60a228834486c39",
      "amharicAlph": "፦",
      "englishSound": "preface colon"
    },
    {
      "id": "68191aa168724d2296a3b862e394ce3e",
      "amharicAlph": "ዳ",
      "englishSound": "da"
    },
    {
      "id": "68415023a8534a9eb39038ad9245d5ba",
      "amharicAlph": "ሣ",
      "englishSound": "sza"
    },
    {
      "id": "6e28b70a47224f1883dfdc9c6ade8bcb",
      "amharicAlph": "ሏ",
      "englishSound": "laa"
    },
    {
      "id": "6e5df88437c541bfa8abbdf27c60b114",
      "amharicAlph": "ዊ",
      "englishSound": "wi"
    },
    {
      "id": "6eb79ba7f7454ef48a53d3f4b806dcaa",
      "amharicAlph": "ኮ",
      "englishSound": "ko"
    },
    {
      "id": "6ec8b363493f4050b1f4b3458d7b38e9",
      "amharicAlph": "ኔ",
      "englishSound": "nee"
    },
    {
      "id": "6eec371c6e6541708b3f4d3618a0c64e",
      "amharicAlph": "ሆ",
      "englishSound": "ho"
    },
    {
      "id": "6f49732dd24a4c6b8faf0482ff78e938",
      "amharicAlph": "ቀ",
      "englishSound": "qe"
    },
    {
      "id": "7032e113621e4b9eb96c0d220febcbc2",
      "amharicAlph": "ኯ",
      "englishSound": "koe"
    },
    {
      "id": "70424131b2b2493a935e0aa8d42d0b3c",
      "amharicAlph": "ጭ",
      "englishSound": "ch"
    },
    {
      "id": "70bf0f9ef86a4b3b9b18d517405d39f7",
      "amharicAlph": "ዒ",
      "englishSound": "i"
    },
    {
      "id": "710686a5a8df434b8f8bda26f3d6eff5",
      "amharicAlph": "ጬ",
      "englishSound": "chee"
    },
    {
      "id": "7192cc8b4f3c4d8487a262ed47b19b91",
      "amharicAlph": "፤",
      "englishSound": "semicolon"
    },
    {
      "id": "71ffd3d56df1488d8848cd7e1981ea75",
      "amharicAlph": "ጫ",
      "englishSound": "cha"
    },
    {
      "id": "72698b035f4e42f59feeeb265bf7df9a",
      "amharicAlph": "ሀ",
      "englishSound": "he"
    },
    {
      "id": "7381af7502434a46b6e639eca377e7b8",
      "amharicAlph": "ኜ",
      "englishSound": "nyee"
    },
    {
      "id": "746752e225b5482087e0a45bf3b094fd",
      "amharicAlph": "ጹ",
      "englishSound": "tsu"
    },
    {
      "id": "74c7f647492f41399177360dffbdb0bf",
      "amharicAlph": "ዄ",
      "englishSound": "xwee"
    },
    {
      "id": "752a12d7d3694cb480ff5b20f92a43df",
      "amharicAlph": "ዩ",
      "englishSound": "yu"
    },
    {
      "id": "76750f162d0e42bebb64135a2bb13007",
      "amharicAlph": "ኁ",
      "englishSound": "Xu"
    },
    {
      "id": "768d4acf2e914ecd88f98fcdd96f392d",
      "amharicAlph": "ፂ",
      "englishSound": "tzi"
    },
    {
      "id": "78d4b010e6b64d74ba517dd9f490c419",
      "amharicAlph": "ጊ",
      "englishSound": "gi"
    },
    {
      "id": "78ee368a78f04d0f980d7c76febd76ae",
      "amharicAlph": "ጏ",
      "englishSound": "gaa"
    },
    {
      "id": "7a6eae99bcae429e85a40596793a411b",
      "amharicAlph": "ፃ",
      "englishSound": "tza"
    },
    {
      "id": "7bb28919e4bf4793be6eeb5ff7c635cc",
      "amharicAlph": "ሞ",
      "englishSound": "mo"
    },
    {
      "id": "7c83b461f12c4e92a25f40f6fdf0ae7b",
      "amharicAlph": "ፎ",
      "englishSound": "fo"
    },
    {
      "id": "7d676cb26c634e5c9575f4163c70f8b5",
      "amharicAlph": "ኃ",
      "englishSound": "Xa"
    },
    {
      "id": "7f1aba43ed324ba6883d5916141fa95f",
      "amharicAlph": "ኀ",
      "englishSound": "Xe"
    },
    {
      "id": "8068d198c41c4e94812f4aefa583e67c",
      "amharicAlph": "ጓ",
      "englishSound": "gwa"
    },
    {
      "id": "80d2e396cd7842058daa7a80ad7364a9",
      "amharicAlph": "ህ",
      "englishSound": "h"
    },
    {
      "id": "816fc6829a444d57aef352357bc841fb",
      "amharicAlph": "ቩ",
      "englishSound": "vu"
    },
    {
      "id": "81e9035bc3be46a3bec0e7cd7635a9ee",
      "amharicAlph": "ጦ",
      "englishSound": "tho"
    },
    {
      "id": "82188ad68dd1410eb0cbd26e9bd70441",
      "amharicAlph": "ኴ",
      "englishSound": "kwee"
    },
    {
      "id": "83188e93eeb2468198835d814e773f3d",
      "amharicAlph": "አ",
      "englishSound": "e"
    },
    {
      "id": "84dda99fd39d4ee0bf1c0c3b44e8b324",
      "amharicAlph": "ጆ",
      "englishSound": "jo"
    },
    {
      "id": "85c59e0a63f24a468ebde4b76ad9adcb",
      "amharicAlph": "ም",
      "englishSound": "m"
    },
    {
      "id": "8a62a8f1d9cc48a284b4ef8be45f3155",
      "amharicAlph": "ቷ",
      "englishSound": "taa"
    },
    {
      "id": "8add6aa71e234319a0beeb1ebb5d8fdd",
      "amharicAlph": "ሷ",
      "englishSound": "saa"
    },
    {
      "id": "8bec3e2f73094c59a3032ed2c9928219",
      "amharicAlph": "ኛ",
      "englishSound": "nya"
    },
    {
      "id": "8ecae2ed835b4847aeef24c0f295b1b1",
      "amharicAlph": "ጥ",
      "englishSound": "th"
    },
    {
      "id": "8f10381e39c645f9afe32f7427994a40",
      "amharicAlph": "ጒ",
      "englishSound": "gwi"
    },
    {
      "id": "8f465499631249cabbbf969c9b51b62e",
      "amharicAlph": "ኧ",
      "englishSound": "aa"
    },
    {
      "id": "9029ed1a0623487fbc51d7a2afb38b2c",
      "amharicAlph": "ጢ",
      "englishSound": "thi"
    },
    {
      "id": "909feec788464105a44f884a8ee54b21",
      "amharicAlph": "ኣ",
      "englishSound": "a"
    },
    {
      "id": "915431a5e2dd4c178046d1d24b06e834",
      "amharicAlph": "ሩ",
      "englishSound": "ru"
    },
    {
      "id": "9242be237b704f46b9afceea5ca562b8",
      "amharicAlph": "ጧ",
      "englishSound": "thaa"
    },
    {
      "id": "92ff806a6b4b4b0e83bad047701287d5",
      "amharicAlph": "ባ",
      "englishSound": "ba"
    },
    {
      "id": "9368a74ba4bf417c85f4577e18d7fcdc",
      "amharicAlph": "ሾ",
      "englishSound": "sho"
    },
    {
      "id": "93c016d1c0894e948b0e8c34a66200fb",
      "amharicAlph": "ፑ",
      "englishSound": "pu"
    },
    {
      "id": "94303707f6034bdfad7de3a0ce3fc60b",
      "amharicAlph": "ጤ",
      "englishSound": "thee"
    },
    {
      "id": "960b9139aa9b4427a4de69e544b7abd4",
      "amharicAlph": "ፒ",
      "englishSound": "pi"
    },
    {
      "id": "961e5c64b1424d20afa44caa2e90fb5a",
      "amharicAlph": "ቁ",
      "englishSound": "qu"
    },
    {
      "id": "967f88032d4142e2b6f8f5c46974d48f",
      "amharicAlph": "ፖ",
      "englishSound": "po"
    },
    {
      "id": "968aacb4aa0f432fa739f9e78047c7a8",
      "amharicAlph": "ው",
      "englishSound": "w"
    },
    {
      "id": "979bf507d1964f5297549e29df2e41d7",
      "amharicAlph": "ጕ",
      "englishSound": "gw"
    },
    {
      "id": "9a9410de26ea4924a68ce574ea828156",
      "amharicAlph": "ቬ",
      "englishSound": "vee"
    },
    {
      "id": "9a980abd9ca74135a89d5a0b052e20fc",
      "amharicAlph": "ፀ",
      "englishSound": "tze"
    },
    {
      "id": "9c3332ff56574243985f3b0101f520a2",
      "amharicAlph": "ጐ",
      "englishSound": "gwe"
    },
    {
      "id": "9c64ba8076944d1f8e10b876cf3bca95",
      "amharicAlph": "ዮ",
      "englishSound": "yo"
    },
    {
      "id": "9cfcb8d8b12e4cf2b9ee8197b707a62e",
      "amharicAlph": "ዢ",
      "englishSound": "zhi"
    },
    {
      "id": "9d4218a022bf45459e815f3b657ef45a",
      "amharicAlph": "ች",
      "englishSound": "c"
    },
    {
      "id": "9e07c6cbab8b414688717980288e4c66",
      "amharicAlph": "ሱ",
      "englishSound": "su"
    },
    {
      "id": "9eafa79e924644cf8971cfba4850dc88",
      "amharicAlph": "ሳ",
      "englishSound": "sa"
    },
    {
      "id": "9f894c5171494d679300f72eb3d6a898",
      "amharicAlph": "ሹ",
      "englishSound": "shu"
    },
    {
      "id": "a04d69d2b54549a6af6e00b41e0dac7c",
      "amharicAlph": "ቈ",
      "englishSound": "qwe"
    },
    {
      "id": "a0602987bb084af8ab5aed0558d7d188",
      "amharicAlph": "፨",
      "englishSound": "paragraph separator"
    },
    {
      "id": "a2cfc4932e2c43d9a47b165e147c89f0",
      "amharicAlph": "ቆ",
      "englishSound": "qo"
    },
    {
      "id": "a2f242a7e05e4fbbb2c38ae49aabe403",
      "amharicAlph": "ዂ",
      "englishSound": "xwi"
    },
    {
      "id": "a2fca8a9aa9243d78ccc5886d1bc9d03",
      "amharicAlph": "ፗ",
      "englishSound": "paa"
    },
    {
      "id": "a309c7698ad54b8d9b8763b7ca1203ed",
      "amharicAlph": "ላ",
      "englishSound": "la"
    },
    {
      "id": "a3483179396249b496bb01b7dd339952",
      "amharicAlph": "ጄ",
      "englishSound": "jee"
    },
    {
      "id": "a4185a4ba87e4bb9b95de596de7a9322",
      "amharicAlph": "ዟ",
      "englishSound": "zaa"
    },
    {
      "id": "a436ced4245348b6abe6dbcc0010ec95",
      "amharicAlph": "ጔ",
      "englishSound": "gwee"
    },
    {
      "id": "a469defdbd6649c9ac58fd99c61806df",
      "amharicAlph": "ለ",
      "englishSound": "le"
    },
    {
      "id": "a5f593edef904153bbd98c8240597988",
      "amharicAlph": "ቿ",
      "englishSound": "caa"
    },
    {
      "id": "a62db8a71e1e4f97961b73af115e9df6",
      "amharicAlph": "ሂ",
      "englishSound": "hi"
    },
    {
      "id": "a81c636aa5d14a02bbcce9893fa35b38",
      "amharicAlph": "ቨ",
      "englishSound": "ve"
    },
    {
      "id": "a8532d3b52894136af1780702dee7f74",
      "amharicAlph": "ቻ",
      "englishSound": "ca"
    },
    {
      "id": "a8b1d3cd2d5a4a018ea8e9c3ffe6988e",
      "amharicAlph": "ሶ",
      "englishSound": "so"
    },
    {
      "id": "a8e4b04a7d6942288b745533f7712e8c",
      "amharicAlph": "ረ",
      "englishSound": "re"
    },
    {
      "id": "a95489d16ea24ab3944a02550c766f6d",
      "amharicAlph": "ኖ",
      "englishSound": "no"
    },
    {
      "id": "a9599d99e21d41ccb3822dc8070e0946",
      "amharicAlph": "ቄ",
      "englishSound": "qee"
    },
    {
      "id": "aa86fb90949f4434bb5829b7388b7463",
      "amharicAlph": "ዧ",
      "englishSound": "zhaa"
    },
    {
      "id": "aaefaf699b5c4bb4a050376265e7675e",
      "amharicAlph": "ዞ",
      "englishSound": "zo"
    },
    {
      "id": "ab09229479c84da5866d62462c4ca7ec",
      "amharicAlph": "ቂ",
      "englishSound": "qi"
    },
    {
      "id": "af7ff5cd29604a13affe691c1dddbaf3",
      "amharicAlph": "ኽ",
      "englishSound": "x"
    },
    {
      "id": "b23ddf45d18f4fc594c2c0187f93d7c1",
      "amharicAlph": "ሢ",
      "englishSound": "szi"
    },
    {
      "id": "b27f9e79a522422e819f3efdc89852d5",
      "amharicAlph": "ጽ",
      "englishSound": "ts"
    },
    {
      "id": "b285cedc45c442a9aca41e8fdf246176",
      "amharicAlph": "ታ",
      "englishSound": "ta"
    },
    {
      "id": "b29b0c749bce4395b62dae86444bead4",
      "amharicAlph": "ኤ",
      "englishSound": "ee"
    },
    {
      "id": "b314038f8cbd461cb0d23d327b341de3",
      "amharicAlph": "ኳ",
      "englishSound": "kwa"
    },
    {
      "id": "b65d408504734d18a8e9be2950777f8b",
      "amharicAlph": "ኘ",
      "englishSound": "nye"
    },
    {
      "id": "b68a70cd9fe747bda2d5b96aa30b7b73",
      "amharicAlph": "ዦ",
      "englishSound": "zho"
    },
    {
      "id": "b7246735b3d9414dad816714e0b51fe1",
      "amharicAlph": "ቢ",
      "englishSound": "bi"
    },
    {
      "id": "b77a38c34725406cbd7749a035276d1c",
      "amharicAlph": "ከ",
      "englishSound": "ke"
    },
    {
      "id": "b808ed24a3a54ed58fd6422c25d7c401",
      "amharicAlph": "ዃ",
      "englishSound": "xwa"
    },
    {
      "id": "ba43165374a74155b548396e9812cb35",
      "amharicAlph": "ጋ",
      "englishSound": "ga"
    },
    {
      "id": "bac495b51b40473ea21a1e0e225929c3",
      "amharicAlph": "ኒ",
      "englishSound": "ni"
    },
    {
      "id": "bb045e68650a45c79e922f0937db071b",
      "amharicAlph": "ሄ",
      "englishSound": "hee"
    },
    {
      "id": "bc139f8b07404099907e97b5a769db8f",
      "amharicAlph": "ዝ",
      "englishSound": "z"
    },
    {
      "id": "bf01b50d58e14995adf563a4112e44a7",
      "amharicAlph": "ኩ",
      "englishSound": "ku"
    },
    {
      "id": "bf1312c8d2b44b098bbea8d33346d668",
      "amharicAlph": "ፈ",
      "englishSound": "fe"
    },
    {
      "id": "bf3af213c4974f5c8399570213c06cbd",
      "amharicAlph": "ሙ",
      "englishSound": "mu"
    },
    {
      "id": "bf90790949424fb099e46922acaf642e",
      "amharicAlph": "ካ",
      "englishSound": "ka"
    },
    {
      "id": "c3b57f9a0bd247f2b1b2f3b115d1cdb0",
      "amharicAlph": "ዔ",
      "englishSound": "ee"
    },
    {
      "id": "c3dbda5238504465a2ecc0d44a6a1737",
      "amharicAlph": "ኆ",
      "englishSound": "Xo"
    },
    {
      "id": "c62d02ae8aef4824bd6ffd094510d53d",
      "amharicAlph": "ጿ",
      "englishSound": "tsaa"
    },
    {
      "id": "c871641e3211496ebcf3c6315dafd226",
      "amharicAlph": "ሴ",
      "englishSound": "see"
    },
    {
      "id": "c8a5648471ee4f9f8ea65302ba9fc3f6",
      "amharicAlph": "ሠ",
      "englishSound": "sze"
    },
    {
      "id": "cb1a535413cd40ea9c5cae7426d10832",
      "amharicAlph": "ጌ",
      "englishSound": "gee"
    },
    {
      "id": "cc49ade1ae9f4fe7904392d8c4957942",
      "amharicAlph": "ዐ",
      "englishSound": "e"
    },
    {
      "id": "cda327bd6bc94fc4aebc22670825f398",
      "amharicAlph": "ሰ",
      "englishSound": "se"
    },
    {
      "id": "cdf2c081d5784ed093dd8acbcc13ec36",
      "amharicAlph": "ፅ",
      "englishSound": "tz"
    },
    {
      "id": "ce9ea2a6b97b4747b56b290da0040b10",
      "amharicAlph": "ዪ",
      "englishSound": "yi"
    },
    {
      "id": "cf2154311ec24960b1445f48cb6b49eb",
      "amharicAlph": "ወ",
      "englishSound": "we"
    },
    {
      "id": "cf5dce089e0b44d98d00132c5e04355a",
      "amharicAlph": "ግ",
      "englishSound": "g"
    },
    {
      "id": "d038d5136486477baebeaa0252acad27",
      "amharicAlph": "ሗ",
      "englishSound": "Haa"
    },
    {
      "id": "d0ff946296fe4974bb9d66efc18c1b8f",
      "amharicAlph": "ቤ",
      "englishSound": "bee"
    },
    {
      "id": "d243f1f9a0da458ebc99b5693c5d6d37",
      "amharicAlph": "ኝ",
      "englishSound": "ny"
    },
    {
      "id": "d331e105bb1d43dbb2795576aafebc08",
      "amharicAlph": "ሤ",
      "englishSound": "szee"
    },
    {
      "id": "d3a0813af9d041efb24fa407d2c47e3e",
      "amharicAlph": "ሉ",
      "englishSound": "lu"
    },
    {
      "id": "d4e53b642f524fe0aa118be9c6cc5d54",
      "amharicAlph": "ሬ",
      "englishSound": "ree"
    },
    {
      "id": "d6c6383787614dd088da54e80d35753c",
      "amharicAlph": "፥",
      "englishSound": "colon"
    },
    {
      "id": "d6ec6f66e5b6493b95a7db9416fcfd72",
      "amharicAlph": "ቶ",
      "englishSound": "to"
    },
    {
      "id": "d7d8e68e8e5f42ac88db0eeef9d6f1c8",
      "amharicAlph": "ዙ",
      "englishSound": "zu"
    },
    {
      "id": "d85905d12b904c6f8d412b74fe46ca7b",
      "amharicAlph": "ዎ",
      "englishSound": "wo"
    },
    {
      "id": "da4ee0ffa88d4353a9141a244ec704f0",
      "amharicAlph": "ኾ",
      "englishSound": "xo"
    },
    {
      "id": "daa96d32287f4cfe8158f7b51f9c65e2",
      "amharicAlph": "ቾ",
      "englishSound": "co"
    },
    {
      "id": "db0a2584c8704e228db79bf29ffc1991",
      "amharicAlph": "ኢ",
      "englishSound": "i"
    },
    {
      "id": "dba3c2f6700d457b97a6c533d840e2b9",
      "amharicAlph": "ዱ",
      "englishSound": "du"
    },
    {
      "id": "dc573c0be3ab454fbeff6a0986c4b279",
      "amharicAlph": "ዉ",
      "englishSound": "wu"
    },
    {
      "id": "ddf2506a4d334877932afe6c770918da",
      "amharicAlph": "ኞ",
      "englishSound": "nyo"
    },
    {
      "id": "df039f3206bb478bae805b35f2aa0b37",
      "amharicAlph": "ሖ",
      "englishSound": "Ho"
    },
    {
      "id": "e0594899ed1142cc9a3ac9ecd66d3192",
      "amharicAlph": "ቯ",
      "englishSound": "vaa"
    },
    {
      "id": "e198e6237afd43e6a52caec337443958",
      "amharicAlph": "ፏ",
      "englishSound": "faa"
    },
    {
      "id": "e267bc14056149169c8bf001a03272be",
      "amharicAlph": "ክ",
      "englishSound": "k"
    },
    {
      "id": "e27d6ade0c90415a92d0a00611a45804",
      "amharicAlph": "ቡ",
      "englishSound": "bu"
    },
    {
      "id": "e509797f2bf143b0ba23af73f7d5416c",
      "amharicAlph": "ጂ",
      "englishSound": "ji"
    },
    {
      "id": "e54d6203bd934747aca42509e1ba00ee",
      "amharicAlph": "የ",
      "englishSound": "ye"
    },
    {
      "id": "e6342e0d879a4aa4bfc4fcaf80a7dd0a",
      "amharicAlph": "ሻ",
      "englishSound": "sha"
    },
    {
      "id": "e668848aff684a5daa37bdde94c373b1",
      "amharicAlph": "ዑ",
      "englishSound": "u"
    },
    {
      "id": "e724ef9647db43a691221bf54ea815df",
      "amharicAlph": "ቌ",
      "englishSound": "qwee"
    },
    {
      "id": "e72dced6f6a143a3b8817b520e89ac91",
      "amharicAlph": "ሔ",
      "englishSound": "Hee"
    },
    {
      "id": "e7d9a04d14044062b07fd2df2049bebd",
      "amharicAlph": "ዷ",
      "englishSound": "daa"
    },
    {
      "id": "e8a7da4b7bc547e584d01ab9a7a70ac2",
      "amharicAlph": "ኡ",
      "englishSound": "u"
    },
    {
      "id": "e8a7e9d4aff5415a95d16f614acd7651",
      "amharicAlph": "ዣ",
      "englishSound": "zha"
    },
    {
      "id": "e8dae0c2dd4240cfb847934589b34425",
      "amharicAlph": "ብ",
      "englishSound": "b"
    },
    {
      "id": "ea44259adc6f4c6f9e2509313a898697",
      "amharicAlph": "ጪ",
      "englishSound": "chi"
    },
    {
      "id": "eacea96de9d84bb1aa6b666d0891e4da",
      "amharicAlph": "ኪ",
      "englishSound": "ki"
    },
    {
      "id": "eb3c023a48b4457496bfc443294b0bc5",
      "amharicAlph": "ኚ",
      "englishSound": "nyi"
    },
    {
      "id": "eb5339feb54d46489949a7f690b8df77",
      "amharicAlph": "ሥ",
      "englishSound": "sz"
    },
    {
      "id": "ebc7761704cc4148985c3e868551c86d",
      "amharicAlph": "።",
      "englishSound": "full stop"
    },
    {
      "id": "eda6245cc9884900913bb2dbc05f01b6",
      "amharicAlph": "ሚ",
      "englishSound": "mi"
    },
    {
      "id": "edc73d0edb074c21bebfef28a9db8803",
      "amharicAlph": "ፕ",
      "englishSound": "p"
    },
    {
      "id": "ee19b1a991014e00b529094c42c7fd16",
      "amharicAlph": "ቹ",
      "englishSound": "cu"
    },
    {
      "id": "ee30ce31e3f1431096bc95c1a8fbf6f8",
      "amharicAlph": "ጡ",
      "englishSound": "thu"
    },
    {
      "id": "ee55e10a56674e2789f3656d9997a688",
      "amharicAlph": "ኦ",
      "englishSound": "o"
    },
    {
      "id": "efc4d028fc214fc8b18b05d243426a54",
      "amharicAlph": "ኲ",
      "englishSound": "kwi"
    },
    {
      "id": "efdcff470f7d426aaa189baebbedbef1",
      "amharicAlph": "ቃ",
      "englishSound": "qa"
    },
    {
      "id": "f00c6a0754794f59b02acf325ff7acf4",
      "amharicAlph": "ኋ",
      "englishSound": "Xwa"
    },
    {
      "id": "f25b83a98c004f089a909ed32e30aa54",
      "amharicAlph": "ስ",
      "englishSound": "s"
    },
    {
      "id": "f2b085ce32d6446585c2f5a032bae64e",
      "amharicAlph": "ዶ",
      "englishSound": "do"
    },
    {
      "id": "f2debde73fe14914ae0be68898b3d05a",
      "amharicAlph": "ቭ",
      "englishSound": "v"
    },
    {
      "id": "f3e5d92cfd814beb94f34365c9cba559",
      "amharicAlph": "ፋ",
      "englishSound": "fa"
    },
    {
      "id": "f4c111e678db4c4d95f0d654b3038a66",
      "amharicAlph": "ሪ",
      "englishSound": "ri"
    },
    {
      "id": "f5052c6c99b14070b2cf54c78895498f",
      "amharicAlph": "ኼ",
      "englishSound": "xee"
    },
    {
      "id": "f53bbe9fb2e24745b92015083bea5316",
      "amharicAlph": "ደ",
      "englishSound": "de"
    },
    {
      "id": "f640fe995ce04f9b891269439ca29eb0",
      "amharicAlph": "ጾ",
      "englishSound": "tso"
    },
    {
      "id": "f659e9ada2c94b6ca986ba1cb972d3e2",
      "amharicAlph": "ሡ",
      "englishSound": "szu"
    },
    {
      "id": "faa12da872f64284a78a3ff3e8c7c753",
      "amharicAlph": "ኟ",
      "englishSound": "nyaa"
    },
    {
      "id": "fb97843bcc8c4617957298924da6d98a",
      "amharicAlph": "ቺ",
      "englishSound": "ci"
    },
    {
      "id": "ff5d7d0fee644558b80d04d37bf01270",
      "amharicAlph": "ዲ",
      "englishSound": "di"
    },
    {
      "id": "ff94932988614f16988fa52902acc15d",
      "amharicAlph": "ፄ",
      "englishSound": "tzee"
    }
  ]

  constructor(private _httpClient: HttpClient, private storage: LoaclstoarageService) { }
  //post alph
  PostAmeharicAlphSerivce(val: any): Observable<any> {
    let endpoint = 'PostAmricAlpha?val'

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._httpClient.post<any>(this._baseUploadUrl + endpoint, JSON.stringify(val),
      { headers: headers });


  }
  //ፎርም ድቢ
  ReturnAllAlph(): Observable<any> {
    return this._httpClient.get(this._baseUploadUrl + 'GetAllAmeharicAlph')
  }

  //Convert to ameharic char to eng char retrun char or string
  async ConvertAmeharicCharByCharToEngAlpha(val: any) {
    let search_value = null;
    for (var i = 0; i < val.length; i++) {
      let sv = this.AmeharcJsonAsy2(val[i])
      if (sv.length > 0) {
        if (search_value != null) {
          search_value = search_value + sv[0].englishSound;
        }
        else {
          search_value = sv[0].englishSound;
        }
      }
    }
    return search_value;
  }

  async AmeharcJsonAsy() {
    let AmeharicJson: any = [
      {
        "id": "00a98f7fed184871954b116ea6de2b9a",
        "amharicAlph": "ቫ",
        "englishSound": "va"
      },
      {
        "id": "00c4e30aa14b4927b10ae42374b8c9b7",
        "amharicAlph": "ሧ",
        "englishSound": "szaa"
      },
      {
        "id": "02eb3b5a4dee49408745a0b3d34165ff",
        "amharicAlph": "ፁ",
        "englishSound": "tzu"
      },
      {
        "id": "038dd7c3255f4711970dfe1bfba54076",
        "amharicAlph": "ዕ",
        "englishSound": "ə"
      },
      {
        "id": "03dd5b7c2cc44fecaab6073d558eecc4",
        "amharicAlph": "ሮ",
        "englishSound": "ro"
      },
      {
        "id": "0613a809c6b0479ea85a83c10816b686",
        "amharicAlph": "እ",
        "englishSound": "ə"
      },
      {
        "id": "06d3164444904ad6a4efe8253c41f0a8",
        "amharicAlph": "ጠ",
        "englishSound": "the"
      },
      {
        "id": "0783f8e26319472eaf417f88a344f980",
        "amharicAlph": "ር",
        "englishSound": "r"
      },
      {
        "id": "08e9f3705831466bb789268ea4dfe9c2",
        "amharicAlph": "ሯ",
        "englishSound": "raa"
      },
      {
        "id": "093f4b97c45847c2a828c95c547370ca",
        "amharicAlph": "ነ",
        "englishSound": "ne"
      },
      {
        "id": "0a13db68cea743a09ba33b6633f55882",
        "amharicAlph": "ጁ",
        "englishSound": "ju"
      },
      {
        "id": "0a9632e8f36746d283f0ab39e6675185",
        "amharicAlph": "ዓ",
        "englishSound": "a"
      },
      {
        "id": "0b04485d5d334fa59977fe0f10d339dc",
        "amharicAlph": "ኄ",
        "englishSound": "Xee"
      },
      {
        "id": "0b5432d29ed041bda447fe5e141c2b0f",
        "amharicAlph": "ጺ",
        "englishSound": "tsi"
      },
      {
        "id": "0c15f97c7ac54f98911fbfce8fced12c",
        "amharicAlph": "ቪ",
        "englishSound": "vi"
      },
      {
        "id": "0c240e068b6a46c8b5cd267979be2313",
        "amharicAlph": "ኌ",
        "englishSound": "Xwee"
      },
      {
        "id": "0d90cf4a0ffb4c67bc2119d3ab53f6f5",
        "amharicAlph": "ራ",
        "englishSound": "ra"
      },
      {
        "id": "0f0baa3e09dc46d9868c5602a496fd21",
        "amharicAlph": "ሦ",
        "englishSound": "szo"
      },
      {
        "id": "0f96bfa2844d4498be6c5b039064f8ed",
        "amharicAlph": "ዖ",
        "englishSound": "o"
      },
      {
        "id": "10997c4e486548899bc2c2f712332b82",
        "amharicAlph": "ኊ",
        "englishSound": "Xwi"
      },
      {
        "id": "118ada3ac03f414e9affb6d3c80694f8",
        "amharicAlph": "ሽ",
        "englishSound": "sh"
      },
      {
        "id": "1301c1f85d7241d89d747cd43bb61950",
        "amharicAlph": "ኇ",
        "englishSound": "Xaa"
      },
      {
        "id": "131e993fe0df41688d08c84a50e45608",
        "amharicAlph": "ሊ",
        "englishSound": "li"
      },
      {
        "id": "1421e262cf27495ea5e27be2ddd40fec",
        "amharicAlph": "ሒ",
        "englishSound": "Hi"
      },
      {
        "id": "149d6b4e0faf4d579afdbef28e109e9e",
        "amharicAlph": "ሼ",
        "englishSound": "shee"
      },
      {
        "id": "14b37b550119411ab8803037e73a0e2a",
        "amharicAlph": "ል",
        "englishSound": "l"
      },
      {
        "id": "14fa3546188e48839902b621bc562d71",
        "amharicAlph": "ማ",
        "englishSound": "ma"
      },
      {
        "id": "15d95ce36b28465ea008d28df9d08e6c",
        "amharicAlph": "ፊ",
        "englishSound": "fi"
      },
      {
        "id": "165073c1c819484ebe1dd8e03be907a0",
        "amharicAlph": "ሲ",
        "englishSound": "si"
      },
      {
        "id": "1bd06b2bf9c0416fb13962592ea10580",
        "amharicAlph": "ሕ",
        "englishSound": "H"
      },
      {
        "id": "1ca657baad164f26a6baa25c919bdade",
        "amharicAlph": "ሺ",
        "englishSound": "shi"
      },
      {
        "id": "1eaa7e164f4e492687ea9dd5b3a97d4b",
        "amharicAlph": "ፌ",
        "englishSound": "fee"
      },
      {
        "id": "1f783eb5f99b4e1b8c0bd05cf8f6af8b",
        "amharicAlph": "ዤ",
        "englishSound": "zhee"
      },
      {
        "id": "216d431c0ec441c3823396544fc0cd1b",
        "amharicAlph": "ቸ",
        "englishSound": "ce"
      },
      {
        "id": "21e17c72dd8f47b6b01917e43069b78b",
        "amharicAlph": "ሓ",
        "englishSound": "Ha"
      },
      {
        "id": "223f5c9925d7446195c5e7e2e0218a95",
        "amharicAlph": "ሜ",
        "englishSound": "mee"
      },
      {
        "id": "2251f77b0bad41f1ae2762d6e20ab0b5",
        "amharicAlph": "ዡ",
        "englishSound": "zhu"
      },
      {
        "id": "2381cec70e32403a97177f89d764a10e",
        "amharicAlph": "ሌ",
        "englishSound": "lee"
      },
      {
        "id": "25b93d0cd2664c688d54444a328280ab",
        "amharicAlph": "ጀ",
        "englishSound": "je"
      },
      {
        "id": "270facc2c60f4670b05f1d82ca9c2bf6",
        "amharicAlph": "ዅ",
        "englishSound": "xw"
      },
      {
        "id": "27ac007b8f18484b864fca0e9559658e",
        "amharicAlph": "ዛ",
        "englishSound": "za"
      },
      {
        "id": "291328d419b3431482c5a404d6a59e38",
        "amharicAlph": "ዀ",
        "englishSound": "xwe"
      },
      {
        "id": "296c2874b0b546b2bb91e00b2fc92362",
        "amharicAlph": "ጎ",
        "englishSound": "go"
      },
      {
        "id": "2b4f1499e678468eaeacf7f10af3e77f",
        "amharicAlph": "ጻ",
        "englishSound": "tsa"
      },
      {
        "id": "2c70876af3304038bb74ab3871d94fe4",
        "amharicAlph": "ኰ",
        "englishSound": "kwe"
      },
      {
        "id": "2c82cba240a04869832311d933990c9a",
        "amharicAlph": "ን",
        "englishSound": "n"
      },
      {
        "id": "2eb1109caee74dfa8f2d881364decc45",
        "amharicAlph": "ፉ",
        "englishSound": "fu"
      },
      {
        "id": "2f1a98c1b42442bcaa76d7adc232d682",
        "amharicAlph": "ጣ",
        "englishSound": "tha"
      },
      {
        "id": "2fabe70c0b9f42ccb5b6803d934e652f",
        "amharicAlph": "ቦ",
        "englishSound": "bo"
      },
      {
        "id": "32a803ec837a49859454bac41865de12",
        "amharicAlph": "ጼ",
        "englishSound": "tsee"
      },
      {
        "id": "3307eae8d71244b1acce4202f473b795",
        "amharicAlph": "፣",
        "englishSound": "comma"
      },
      {
        "id": "332ed9ce0fb74170920a466188893574",
        "amharicAlph": "ጨ",
        "englishSound": "che"
      },
      {
        "id": "334b78ca263f4166ad4f509b79a0016c",
        "amharicAlph": "ጉ",
        "englishSound": "gu"
      },
      {
        "id": "33a21bd5c1254c8180eeee6a158e0ba5",
        "amharicAlph": "ኅ",
        "englishSound": "X"
      },
      {
        "id": "350fa63eb1fa41e8afccd5f83d16fafd",
        "amharicAlph": "ገ",
        "englishSound": "ge"
      },
      {
        "id": "3534fa9651eb4cb69f4aff9a0cfac703",
        "amharicAlph": "ኗ",
        "englishSound": "naa"
      },
      {
        "id": "35bb0bd91b0a478b8872496556967dc3",
        "amharicAlph": "ኬ",
        "englishSound": "kee"
      },
      {
        "id": "393af4a59f244654910335aaad896be8",
        "amharicAlph": "ኑ",
        "englishSound": "nu"
      },
      {
        "id": "39557b7a2c734690b170d2e77c899680",
        "amharicAlph": "ፐ",
        "englishSound": "pe"
      },
      {
        "id": "3a94d6b5c5e947e9a638ae505224b992",
        "amharicAlph": "ጃ",
        "englishSound": "ja"
      },
      {
        "id": "3aef1fa846c346ce95522a1c48fcf87b",
        "amharicAlph": "ሐ",
        "englishSound": "He"
      },
      {
        "id": "3ba0ed843f15465ba3c17cf13e76ee1c",
        "amharicAlph": "ቱ",
        "englishSound": "tu"
      },
      {
        "id": "3e1ed8e923e44ca28e9415fcd1fc1977",
        "amharicAlph": "ኹ",
        "englishSound": "xu"
      },
      {
        "id": "3e4d9b1ed13b4abeb138d5fd4526ffd9",
        "amharicAlph": "ፓ",
        "englishSound": "pa"
      },
      {
        "id": "3eb40a49899d428f9874361ab80c4b68",
        "amharicAlph": "ጶ",
        "englishSound": "pho"
      },
      {
        "id": "40fa66a5baff41008782388b919378a8",
        "amharicAlph": "፡",
        "englishSound": "wordspace"
      },
      {
        "id": "411f15a39d2e49e69b8cb71efcce03cf",
        "amharicAlph": "ጩ",
        "englishSound": "chu"
      },
      {
        "id": "42f8727e767f451d843b0b3e2d5c2b96",
        "amharicAlph": "ዚ",
        "englishSound": "zi"
      },
      {
        "id": "44c324b9a1184e2a98c95ced9aa52bf8",
        "amharicAlph": "ያ",
        "englishSound": "ya"
      },
      {
        "id": "463e1ca9c20442dda88a6884dac59629",
        "amharicAlph": "ተ",
        "englishSound": "te"
      },
      {
        "id": "469f6b71dfa54b97aef5f6897e8ba1fb",
        "amharicAlph": "ሿ",
        "englishSound": "shaa"
      },
      {
        "id": "47028fcf8cc54eb4924a66719ca4a9cc",
        "amharicAlph": "ዬ",
        "englishSound": "yee"
      },
      {
        "id": "4721818b25a74d16bd73531d2b967120",
        "amharicAlph": "ኻ",
        "englishSound": "xa"
      },
      {
        "id": "4816e42bb84e433ea696accb30678b72",
        "amharicAlph": "ዘ",
        "englishSound": "ze"
      },
      {
        "id": "4930cf63739c4097b26bcd4a499c7b74",
        "amharicAlph": "፠",
        "englishSound": "section mark"
      },
      {
        "id": "4953210851f54ea2b2d65205a42e6bde",
        "amharicAlph": "ይ",
        "englishSound": "y"
      },
      {
        "id": "4a613109768349f586c297073735632e",
        "amharicAlph": "ፔ",
        "englishSound": "pee"
      },
      {
        "id": "4b8ac62c16b448c8aed1df72d2639f84",
        "amharicAlph": "ጇ",
        "englishSound": "jaa"
      },
      {
        "id": "4c657bcb989c4884b4605f0b5e3598f3",
        "amharicAlph": "ሑ",
        "englishSound": "Hu"
      },
      {
        "id": "4d62ee8656ba48fb839b35fe1df9ccc1",
        "amharicAlph": "ቲ",
        "englishSound": "ti"
      },
      {
        "id": "4e17e22ee84a4a799027c65035de81c2",
        "amharicAlph": "ቧ",
        "englishSound": "baa"
      },
      {
        "id": "4e68171972b94bbe91e7fa1485f88102",
        "amharicAlph": "ሎ",
        "englishSound": "lo"
      },
      {
        "id": "4f9cda36b1724c6e9e959b11c183d01d",
        "amharicAlph": "ቴ",
        "englishSound": "tee"
      },
      {
        "id": "4feb8e064a1b448ca12632396db61269",
        "amharicAlph": "ድ",
        "englishSound": "d"
      },
      {
        "id": "504a8fd77fee47999f086e582b9e4b3f",
        "amharicAlph": "ቼ",
        "englishSound": "cee"
      },
      {
        "id": "5067a798e47d4282b55f7bd4814d68b3",
        "amharicAlph": "ዌ",
        "englishSound": "wee"
      },
      {
        "id": "507f4856a6c74201945b66e43af15b76",
        "amharicAlph": "ፆ",
        "englishSound": "tzo"
      },
      {
        "id": "5163fdcef93d4313bdf6007330bebf47",
        "amharicAlph": "ቋ",
        "englishSound": "qwa"
      },
      {
        "id": "51c4b1b303b74e4b948bf859aaa0fb78",
        "amharicAlph": "መ",
        "englishSound": "me"
      },
      {
        "id": "51ecac8134104b2b8ffdc95c241fcb5c",
        "amharicAlph": "ዜ",
        "englishSound": "zee"
      },
      {
        "id": "52f73d9c7be34c81a62708d4b5c890a8",
        "amharicAlph": "ቊ",
        "englishSound": "qwi"
      },
      {
        "id": "539a955976074aeca0b1e50db06d4c83",
        "amharicAlph": "ዴ",
        "englishSound": "dee"
      },
      {
        "id": "5429ad8ea5194d979e3ec10eab107a07",
        "amharicAlph": "በ",
        "englishSound": "be"
      },
      {
        "id": "54c36ea0004e430a8281a43fa14c004d",
        "amharicAlph": "ኵ",
        "englishSound": "kw"
      },
      {
        "id": "550b32c5e73348288999e5a0fb1e6608",
        "amharicAlph": "ቅ",
        "englishSound": "q"
      },
      {
        "id": "57748f61d8ae4a3e894509dd2626b4eb",
        "amharicAlph": "ዋ",
        "englishSound": "wa"
      },
      {
        "id": "57867738d4cf4ae0a88de8c84b5082a6",
        "amharicAlph": "ኍ",
        "englishSound": "Xw"
      },
      {
        "id": "58e2773a88094911a893081327eeef9a",
        "amharicAlph": "ፍ",
        "englishSound": "f"
      },
      {
        "id": "5b159030804d4ab69017aa86e0f95407",
        "amharicAlph": "ኺ",
        "englishSound": "xi"
      },
      {
        "id": "5bb52ea71e65441dadd6ab5bed9f5468",
        "amharicAlph": "ቍ",
        "englishSound": "qw"
      },
      {
        "id": "5dc958b0de16442abafb7b97eece4d62",
        "amharicAlph": "ሸ",
        "englishSound": "she"
      },
      {
        "id": "5dca3484d2e04181b0cb791f9e52dd45",
        "amharicAlph": "ዠ",
        "englishSound": "zhe"
      },
      {
        "id": "5e88fe2d06ae4fdfaf3dbacf7c12a567",
        "amharicAlph": "ሟ",
        "englishSound": "maa"
      },
      {
        "id": "5eb275c809fe4a93bed145e889410d59",
        "amharicAlph": "፧",
        "englishSound": "question mark"
      },
      {
        "id": "5fa68bcc21cc42a8b0923fda2c05c0a9",
        "amharicAlph": "ሃ",
        "englishSound": "ha"
      },
      {
        "id": "6056ee62bf66457488e4cedd7428a434",
        "amharicAlph": "ት",
        "englishSound": "t"
      },
      {
        "id": "62230d8df2cc43c5a4c104e4d95a6230",
        "amharicAlph": "ኂ",
        "englishSound": "Xi"
      },
      {
        "id": "62e3c218116a4ef6b38c712f8ec2876b",
        "amharicAlph": "ቇ",
        "englishSound": "qaa"
      },
      {
        "id": "64f5263d8065495fb0276ef44cd7f8c8",
        "amharicAlph": "ና",
        "englishSound": "na"
      },
      {
        "id": "6540baa3081c48439a1d2d134a469aed",
        "amharicAlph": "ኙ",
        "englishSound": "nyu"
      },
      {
        "id": "65fde1227e4f40639d4b00ae13086e88",
        "amharicAlph": "ኈ",
        "englishSound": "Xwe"
      },
      {
        "id": "6613446b24c54fb0bfee3c8018a24f1d",
        "amharicAlph": "ጅ",
        "englishSound": "j"
      },
      {
        "id": "6623b66829e94b0d8faee60b790f657d",
        "amharicAlph": "ሁ",
        "englishSound": "hu"
      },
      {
        "id": "66f2c824cabf4d36a18e3c6478f11e72",
        "amharicAlph": "ዥ",
        "englishSound": "zh"
      },
      {
        "id": "678d002457f34148afccaba8c0399379",
        "amharicAlph": "ቮ",
        "englishSound": "vo"
      },
      {
        "id": "68019ce808504757b60a228834486c39",
        "amharicAlph": "፦",
        "englishSound": "preface colon"
      },
      {
        "id": "68191aa168724d2296a3b862e394ce3e",
        "amharicAlph": "ዳ",
        "englishSound": "da"
      },
      {
        "id": "68415023a8534a9eb39038ad9245d5ba",
        "amharicAlph": "ሣ",
        "englishSound": "sza"
      },
      {
        "id": "6e28b70a47224f1883dfdc9c6ade8bcb",
        "amharicAlph": "ሏ",
        "englishSound": "laa"
      },
      {
        "id": "6e5df88437c541bfa8abbdf27c60b114",
        "amharicAlph": "ዊ",
        "englishSound": "wi"
      },
      {
        "id": "6eb79ba7f7454ef48a53d3f4b806dcaa",
        "amharicAlph": "ኮ",
        "englishSound": "ko"
      },
      {
        "id": "6ec8b363493f4050b1f4b3458d7b38e9",
        "amharicAlph": "ኔ",
        "englishSound": "nee"
      },
      {
        "id": "6eec371c6e6541708b3f4d3618a0c64e",
        "amharicAlph": "ሆ",
        "englishSound": "ho"
      },
      {
        "id": "6f49732dd24a4c6b8faf0482ff78e938",
        "amharicAlph": "ቀ",
        "englishSound": "qe"
      },
      {
        "id": "7032e113621e4b9eb96c0d220febcbc2",
        "amharicAlph": "ኯ",
        "englishSound": "koe"
      },
      {
        "id": "70424131b2b2493a935e0aa8d42d0b3c",
        "amharicAlph": "ጭ",
        "englishSound": "ch"
      },
      {
        "id": "70bf0f9ef86a4b3b9b18d517405d39f7",
        "amharicAlph": "ዒ",
        "englishSound": "i"
      },
      {
        "id": "710686a5a8df434b8f8bda26f3d6eff5",
        "amharicAlph": "ጬ",
        "englishSound": "chee"
      },
      {
        "id": "7192cc8b4f3c4d8487a262ed47b19b91",
        "amharicAlph": "፤",
        "englishSound": "semicolon"
      },
      {
        "id": "71ffd3d56df1488d8848cd7e1981ea75",
        "amharicAlph": "ጫ",
        "englishSound": "cha"
      },
      {
        "id": "72698b035f4e42f59feeeb265bf7df9a",
        "amharicAlph": "ሀ",
        "englishSound": "he"
      },
      {
        "id": "7381af7502434a46b6e639eca377e7b8",
        "amharicAlph": "ኜ",
        "englishSound": "nyee"
      },
      {
        "id": "746752e225b5482087e0a45bf3b094fd",
        "amharicAlph": "ጹ",
        "englishSound": "tsu"
      },
      {
        "id": "74c7f647492f41399177360dffbdb0bf",
        "amharicAlph": "ዄ",
        "englishSound": "xwee"
      },
      {
        "id": "752a12d7d3694cb480ff5b20f92a43df",
        "amharicAlph": "ዩ",
        "englishSound": "yu"
      },
      {
        "id": "76750f162d0e42bebb64135a2bb13007",
        "amharicAlph": "ኁ",
        "englishSound": "Xu"
      },
      {
        "id": "768d4acf2e914ecd88f98fcdd96f392d",
        "amharicAlph": "ፂ",
        "englishSound": "tzi"
      },
      {
        "id": "78d4b010e6b64d74ba517dd9f490c419",
        "amharicAlph": "ጊ",
        "englishSound": "gi"
      },
      {
        "id": "78ee368a78f04d0f980d7c76febd76ae",
        "amharicAlph": "ጏ",
        "englishSound": "gaa"
      },
      {
        "id": "7a6eae99bcae429e85a40596793a411b",
        "amharicAlph": "ፃ",
        "englishSound": "tza"
      },
      {
        "id": "7bb28919e4bf4793be6eeb5ff7c635cc",
        "amharicAlph": "ሞ",
        "englishSound": "mo"
      },
      {
        "id": "7c83b461f12c4e92a25f40f6fdf0ae7b",
        "amharicAlph": "ፎ",
        "englishSound": "fo"
      },
      {
        "id": "7d676cb26c634e5c9575f4163c70f8b5",
        "amharicAlph": "ኃ",
        "englishSound": "Xa"
      },
      {
        "id": "7f1aba43ed324ba6883d5916141fa95f",
        "amharicAlph": "ኀ",
        "englishSound": "Xe"
      },
      {
        "id": "8068d198c41c4e94812f4aefa583e67c",
        "amharicAlph": "ጓ",
        "englishSound": "gwa"
      },
      {
        "id": "80d2e396cd7842058daa7a80ad7364a9",
        "amharicAlph": "ህ",
        "englishSound": "h"
      },
      {
        "id": "816fc6829a444d57aef352357bc841fb",
        "amharicAlph": "ቩ",
        "englishSound": "vu"
      },
      {
        "id": "81e9035bc3be46a3bec0e7cd7635a9ee",
        "amharicAlph": "ጦ",
        "englishSound": "tho"
      },
      {
        "id": "82188ad68dd1410eb0cbd26e9bd70441",
        "amharicAlph": "ኴ",
        "englishSound": "kwee"
      },
      {
        "id": "83188e93eeb2468198835d814e773f3d",
        "amharicAlph": "አ",
        "englishSound": "e"
      },
      {
        "id": "84dda99fd39d4ee0bf1c0c3b44e8b324",
        "amharicAlph": "ጆ",
        "englishSound": "jo"
      },
      {
        "id": "85c59e0a63f24a468ebde4b76ad9adcb",
        "amharicAlph": "ም",
        "englishSound": "m"
      },
      {
        "id": "8a62a8f1d9cc48a284b4ef8be45f3155",
        "amharicAlph": "ቷ",
        "englishSound": "taa"
      },
      {
        "id": "8add6aa71e234319a0beeb1ebb5d8fdd",
        "amharicAlph": "ሷ",
        "englishSound": "saa"
      },
      {
        "id": "8bec3e2f73094c59a3032ed2c9928219",
        "amharicAlph": "ኛ",
        "englishSound": "nya"
      },
      {
        "id": "8ecae2ed835b4847aeef24c0f295b1b1",
        "amharicAlph": "ጥ",
        "englishSound": "th"
      },
      {
        "id": "8f10381e39c645f9afe32f7427994a40",
        "amharicAlph": "ጒ",
        "englishSound": "gwi"
      },
      {
        "id": "8f465499631249cabbbf969c9b51b62e",
        "amharicAlph": "ኧ",
        "englishSound": "aa"
      },
      {
        "id": "9029ed1a0623487fbc51d7a2afb38b2c",
        "amharicAlph": "ጢ",
        "englishSound": "thi"
      },
      {
        "id": "909feec788464105a44f884a8ee54b21",
        "amharicAlph": "ኣ",
        "englishSound": "a"
      },
      {
        "id": "915431a5e2dd4c178046d1d24b06e834",
        "amharicAlph": "ሩ",
        "englishSound": "ru"
      },
      {
        "id": "9242be237b704f46b9afceea5ca562b8",
        "amharicAlph": "ጧ",
        "englishSound": "thaa"
      },
      {
        "id": "92ff806a6b4b4b0e83bad047701287d5",
        "amharicAlph": "ባ",
        "englishSound": "ba"
      },
      {
        "id": "9368a74ba4bf417c85f4577e18d7fcdc",
        "amharicAlph": "ሾ",
        "englishSound": "sho"
      },
      {
        "id": "93c016d1c0894e948b0e8c34a66200fb",
        "amharicAlph": "ፑ",
        "englishSound": "pu"
      },
      {
        "id": "94303707f6034bdfad7de3a0ce3fc60b",
        "amharicAlph": "ጤ",
        "englishSound": "thee"
      },
      {
        "id": "960b9139aa9b4427a4de69e544b7abd4",
        "amharicAlph": "ፒ",
        "englishSound": "pi"
      },
      {
        "id": "961e5c64b1424d20afa44caa2e90fb5a",
        "amharicAlph": "ቁ",
        "englishSound": "qu"
      },
      {
        "id": "967f88032d4142e2b6f8f5c46974d48f",
        "amharicAlph": "ፖ",
        "englishSound": "po"
      },
      {
        "id": "968aacb4aa0f432fa739f9e78047c7a8",
        "amharicAlph": "ው",
        "englishSound": "w"
      },
      {
        "id": "979bf507d1964f5297549e29df2e41d7",
        "amharicAlph": "ጕ",
        "englishSound": "gw"
      },
      {
        "id": "9a9410de26ea4924a68ce574ea828156",
        "amharicAlph": "ቬ",
        "englishSound": "vee"
      },
      {
        "id": "9a980abd9ca74135a89d5a0b052e20fc",
        "amharicAlph": "ፀ",
        "englishSound": "tze"
      },
      {
        "id": "9c3332ff56574243985f3b0101f520a2",
        "amharicAlph": "ጐ",
        "englishSound": "gwe"
      },
      {
        "id": "9c64ba8076944d1f8e10b876cf3bca95",
        "amharicAlph": "ዮ",
        "englishSound": "yo"
      },
      {
        "id": "9cfcb8d8b12e4cf2b9ee8197b707a62e",
        "amharicAlph": "ዢ",
        "englishSound": "zhi"
      },
      {
        "id": "9d4218a022bf45459e815f3b657ef45a",
        "amharicAlph": "ች",
        "englishSound": "c"
      },
      {
        "id": "9e07c6cbab8b414688717980288e4c66",
        "amharicAlph": "ሱ",
        "englishSound": "su"
      },
      {
        "id": "9eafa79e924644cf8971cfba4850dc88",
        "amharicAlph": "ሳ",
        "englishSound": "sa"
      },
      {
        "id": "9f894c5171494d679300f72eb3d6a898",
        "amharicAlph": "ሹ",
        "englishSound": "shu"
      },
      {
        "id": "a04d69d2b54549a6af6e00b41e0dac7c",
        "amharicAlph": "ቈ",
        "englishSound": "qwe"
      },
      {
        "id": "a0602987bb084af8ab5aed0558d7d188",
        "amharicAlph": "፨",
        "englishSound": "paragraph separator"
      },
      {
        "id": "a2cfc4932e2c43d9a47b165e147c89f0",
        "amharicAlph": "ቆ",
        "englishSound": "qo"
      },
      {
        "id": "a2f242a7e05e4fbbb2c38ae49aabe403",
        "amharicAlph": "ዂ",
        "englishSound": "xwi"
      },
      {
        "id": "a2fca8a9aa9243d78ccc5886d1bc9d03",
        "amharicAlph": "ፗ",
        "englishSound": "paa"
      },
      {
        "id": "a309c7698ad54b8d9b8763b7ca1203ed",
        "amharicAlph": "ላ",
        "englishSound": "la"
      },
      {
        "id": "a3483179396249b496bb01b7dd339952",
        "amharicAlph": "ጄ",
        "englishSound": "jee"
      },
      {
        "id": "a4185a4ba87e4bb9b95de596de7a9322",
        "amharicAlph": "ዟ",
        "englishSound": "zaa"
      },
      {
        "id": "a436ced4245348b6abe6dbcc0010ec95",
        "amharicAlph": "ጔ",
        "englishSound": "gwee"
      },
      {
        "id": "a469defdbd6649c9ac58fd99c61806df",
        "amharicAlph": "ለ",
        "englishSound": "le"
      },
      {
        "id": "a5f593edef904153bbd98c8240597988",
        "amharicAlph": "ቿ",
        "englishSound": "caa"
      },
      {
        "id": "a62db8a71e1e4f97961b73af115e9df6",
        "amharicAlph": "ሂ",
        "englishSound": "hi"
      },
      {
        "id": "a81c636aa5d14a02bbcce9893fa35b38",
        "amharicAlph": "ቨ",
        "englishSound": "ve"
      },
      {
        "id": "a8532d3b52894136af1780702dee7f74",
        "amharicAlph": "ቻ",
        "englishSound": "ca"
      },
      {
        "id": "a8b1d3cd2d5a4a018ea8e9c3ffe6988e",
        "amharicAlph": "ሶ",
        "englishSound": "so"
      },
      {
        "id": "a8e4b04a7d6942288b745533f7712e8c",
        "amharicAlph": "ረ",
        "englishSound": "re"
      },
      {
        "id": "a95489d16ea24ab3944a02550c766f6d",
        "amharicAlph": "ኖ",
        "englishSound": "no"
      },
      {
        "id": "a9599d99e21d41ccb3822dc8070e0946",
        "amharicAlph": "ቄ",
        "englishSound": "qee"
      },
      {
        "id": "aa86fb90949f4434bb5829b7388b7463",
        "amharicAlph": "ዧ",
        "englishSound": "zhaa"
      },
      {
        "id": "aaefaf699b5c4bb4a050376265e7675e",
        "amharicAlph": "ዞ",
        "englishSound": "zo"
      },
      {
        "id": "ab09229479c84da5866d62462c4ca7ec",
        "amharicAlph": "ቂ",
        "englishSound": "qi"
      },
      {
        "id": "af7ff5cd29604a13affe691c1dddbaf3",
        "amharicAlph": "ኽ",
        "englishSound": "x"
      },
      {
        "id": "b23ddf45d18f4fc594c2c0187f93d7c1",
        "amharicAlph": "ሢ",
        "englishSound": "szi"
      },
      {
        "id": "b27f9e79a522422e819f3efdc89852d5",
        "amharicAlph": "ጽ",
        "englishSound": "ts"
      },
      {
        "id": "b285cedc45c442a9aca41e8fdf246176",
        "amharicAlph": "ታ",
        "englishSound": "ta"
      },
      {
        "id": "b29b0c749bce4395b62dae86444bead4",
        "amharicAlph": "ኤ",
        "englishSound": "ee"
      },
      {
        "id": "b314038f8cbd461cb0d23d327b341de3",
        "amharicAlph": "ኳ",
        "englishSound": "kwa"
      },
      {
        "id": "b65d408504734d18a8e9be2950777f8b",
        "amharicAlph": "ኘ",
        "englishSound": "nye"
      },
      {
        "id": "b68a70cd9fe747bda2d5b96aa30b7b73",
        "amharicAlph": "ዦ",
        "englishSound": "zho"
      },
      {
        "id": "b7246735b3d9414dad816714e0b51fe1",
        "amharicAlph": "ቢ",
        "englishSound": "bi"
      },
      {
        "id": "b77a38c34725406cbd7749a035276d1c",
        "amharicAlph": "ከ",
        "englishSound": "ke"
      },
      {
        "id": "b808ed24a3a54ed58fd6422c25d7c401",
        "amharicAlph": "ዃ",
        "englishSound": "xwa"
      },
      {
        "id": "ba43165374a74155b548396e9812cb35",
        "amharicAlph": "ጋ",
        "englishSound": "ga"
      },
      {
        "id": "bac495b51b40473ea21a1e0e225929c3",
        "amharicAlph": "ኒ",
        "englishSound": "ni"
      },
      {
        "id": "bb045e68650a45c79e922f0937db071b",
        "amharicAlph": "ሄ",
        "englishSound": "hee"
      },
      {
        "id": "bc139f8b07404099907e97b5a769db8f",
        "amharicAlph": "ዝ",
        "englishSound": "z"
      },
      {
        "id": "bf01b50d58e14995adf563a4112e44a7",
        "amharicAlph": "ኩ",
        "englishSound": "ku"
      },
      {
        "id": "bf1312c8d2b44b098bbea8d33346d668",
        "amharicAlph": "ፈ",
        "englishSound": "fe"
      },
      {
        "id": "bf3af213c4974f5c8399570213c06cbd",
        "amharicAlph": "ሙ",
        "englishSound": "mu"
      },
      {
        "id": "bf90790949424fb099e46922acaf642e",
        "amharicAlph": "ካ",
        "englishSound": "ka"
      },
      {
        "id": "c3b57f9a0bd247f2b1b2f3b115d1cdb0",
        "amharicAlph": "ዔ",
        "englishSound": "ee"
      },
      {
        "id": "c3dbda5238504465a2ecc0d44a6a1737",
        "amharicAlph": "ኆ",
        "englishSound": "Xo"
      },
      {
        "id": "c62d02ae8aef4824bd6ffd094510d53d",
        "amharicAlph": "ጿ",
        "englishSound": "tsaa"
      },
      {
        "id": "c871641e3211496ebcf3c6315dafd226",
        "amharicAlph": "ሴ",
        "englishSound": "see"
      },
      {
        "id": "c8a5648471ee4f9f8ea65302ba9fc3f6",
        "amharicAlph": "ሠ",
        "englishSound": "sze"
      },
      {
        "id": "cb1a535413cd40ea9c5cae7426d10832",
        "amharicAlph": "ጌ",
        "englishSound": "gee"
      },
      {
        "id": "cc49ade1ae9f4fe7904392d8c4957942",
        "amharicAlph": "ዐ",
        "englishSound": "e"
      },
      {
        "id": "cda327bd6bc94fc4aebc22670825f398",
        "amharicAlph": "ሰ",
        "englishSound": "se"
      },
      {
        "id": "cdf2c081d5784ed093dd8acbcc13ec36",
        "amharicAlph": "ፅ",
        "englishSound": "tz"
      },
      {
        "id": "ce9ea2a6b97b4747b56b290da0040b10",
        "amharicAlph": "ዪ",
        "englishSound": "yi"
      },
      {
        "id": "cf2154311ec24960b1445f48cb6b49eb",
        "amharicAlph": "ወ",
        "englishSound": "we"
      },
      {
        "id": "cf5dce089e0b44d98d00132c5e04355a",
        "amharicAlph": "ግ",
        "englishSound": "g"
      },
      {
        "id": "d038d5136486477baebeaa0252acad27",
        "amharicAlph": "ሗ",
        "englishSound": "Haa"
      },
      {
        "id": "d0ff946296fe4974bb9d66efc18c1b8f",
        "amharicAlph": "ቤ",
        "englishSound": "bee"
      },
      {
        "id": "d243f1f9a0da458ebc99b5693c5d6d37",
        "amharicAlph": "ኝ",
        "englishSound": "ny"
      },
      {
        "id": "d331e105bb1d43dbb2795576aafebc08",
        "amharicAlph": "ሤ",
        "englishSound": "szee"
      },
      {
        "id": "d3a0813af9d041efb24fa407d2c47e3e",
        "amharicAlph": "ሉ",
        "englishSound": "lu"
      },
      {
        "id": "d4e53b642f524fe0aa118be9c6cc5d54",
        "amharicAlph": "ሬ",
        "englishSound": "ree"
      },
      {
        "id": "d6c6383787614dd088da54e80d35753c",
        "amharicAlph": "፥",
        "englishSound": "colon"
      },
      {
        "id": "d6ec6f66e5b6493b95a7db9416fcfd72",
        "amharicAlph": "ቶ",
        "englishSound": "to"
      },
      {
        "id": "d7d8e68e8e5f42ac88db0eeef9d6f1c8",
        "amharicAlph": "ዙ",
        "englishSound": "zu"
      },
      {
        "id": "d85905d12b904c6f8d412b74fe46ca7b",
        "amharicAlph": "ዎ",
        "englishSound": "wo"
      },
      {
        "id": "da4ee0ffa88d4353a9141a244ec704f0",
        "amharicAlph": "ኾ",
        "englishSound": "xo"
      },
      {
        "id": "daa96d32287f4cfe8158f7b51f9c65e2",
        "amharicAlph": "ቾ",
        "englishSound": "co"
      },
      {
        "id": "db0a2584c8704e228db79bf29ffc1991",
        "amharicAlph": "ኢ",
        "englishSound": "i"
      },
      {
        "id": "dba3c2f6700d457b97a6c533d840e2b9",
        "amharicAlph": "ዱ",
        "englishSound": "du"
      },
      {
        "id": "dc573c0be3ab454fbeff6a0986c4b279",
        "amharicAlph": "ዉ",
        "englishSound": "wu"
      },
      {
        "id": "ddf2506a4d334877932afe6c770918da",
        "amharicAlph": "ኞ",
        "englishSound": "nyo"
      },
      {
        "id": "df039f3206bb478bae805b35f2aa0b37",
        "amharicAlph": "ሖ",
        "englishSound": "Ho"
      },
      {
        "id": "e0594899ed1142cc9a3ac9ecd66d3192",
        "amharicAlph": "ቯ",
        "englishSound": "vaa"
      },
      {
        "id": "e198e6237afd43e6a52caec337443958",
        "amharicAlph": "ፏ",
        "englishSound": "faa"
      },
      {
        "id": "e267bc14056149169c8bf001a03272be",
        "amharicAlph": "ክ",
        "englishSound": "k"
      },
      {
        "id": "e27d6ade0c90415a92d0a00611a45804",
        "amharicAlph": "ቡ",
        "englishSound": "bu"
      },
      {
        "id": "e509797f2bf143b0ba23af73f7d5416c",
        "amharicAlph": "ጂ",
        "englishSound": "ji"
      },
      {
        "id": "e54d6203bd934747aca42509e1ba00ee",
        "amharicAlph": "የ",
        "englishSound": "ye"
      },
      {
        "id": "e6342e0d879a4aa4bfc4fcaf80a7dd0a",
        "amharicAlph": "ሻ",
        "englishSound": "sha"
      },
      {
        "id": "e668848aff684a5daa37bdde94c373b1",
        "amharicAlph": "ዑ",
        "englishSound": "u"
      },
      {
        "id": "e724ef9647db43a691221bf54ea815df",
        "amharicAlph": "ቌ",
        "englishSound": "qwee"
      },
      {
        "id": "e72dced6f6a143a3b8817b520e89ac91",
        "amharicAlph": "ሔ",
        "englishSound": "Hee"
      },
      {
        "id": "e7d9a04d14044062b07fd2df2049bebd",
        "amharicAlph": "ዷ",
        "englishSound": "daa"
      },
      {
        "id": "e8a7da4b7bc547e584d01ab9a7a70ac2",
        "amharicAlph": "ኡ",
        "englishSound": "u"
      },
      {
        "id": "e8a7e9d4aff5415a95d16f614acd7651",
        "amharicAlph": "ዣ",
        "englishSound": "zha"
      },
      {
        "id": "e8dae0c2dd4240cfb847934589b34425",
        "amharicAlph": "ብ",
        "englishSound": "b"
      },
      {
        "id": "ea44259adc6f4c6f9e2509313a898697",
        "amharicAlph": "ጪ",
        "englishSound": "chi"
      },
      {
        "id": "eacea96de9d84bb1aa6b666d0891e4da",
        "amharicAlph": "ኪ",
        "englishSound": "ki"
      },
      {
        "id": "eb3c023a48b4457496bfc443294b0bc5",
        "amharicAlph": "ኚ",
        "englishSound": "nyi"
      },
      {
        "id": "eb5339feb54d46489949a7f690b8df77",
        "amharicAlph": "ሥ",
        "englishSound": "sz"
      },
      {
        "id": "ebc7761704cc4148985c3e868551c86d",
        "amharicAlph": "።",
        "englishSound": "full stop"
      },
      {
        "id": "eda6245cc9884900913bb2dbc05f01b6",
        "amharicAlph": "ሚ",
        "englishSound": "mi"
      },
      {
        "id": "edc73d0edb074c21bebfef28a9db8803",
        "amharicAlph": "ፕ",
        "englishSound": "p"
      },
      {
        "id": "ee19b1a991014e00b529094c42c7fd16",
        "amharicAlph": "ቹ",
        "englishSound": "cu"
      },
      {
        "id": "ee30ce31e3f1431096bc95c1a8fbf6f8",
        "amharicAlph": "ጡ",
        "englishSound": "thu"
      },
      {
        "id": "ee55e10a56674e2789f3656d9997a688",
        "amharicAlph": "ኦ",
        "englishSound": "o"
      },
      {
        "id": "efc4d028fc214fc8b18b05d243426a54",
        "amharicAlph": "ኲ",
        "englishSound": "kwi"
      },
      {
        "id": "efdcff470f7d426aaa189baebbedbef1",
        "amharicAlph": "ቃ",
        "englishSound": "qa"
      },
      {
        "id": "f00c6a0754794f59b02acf325ff7acf4",
        "amharicAlph": "ኋ",
        "englishSound": "Xwa"
      },
      {
        "id": "f25b83a98c004f089a909ed32e30aa54",
        "amharicAlph": "ስ",
        "englishSound": "s"
      },
      {
        "id": "f2b085ce32d6446585c2f5a032bae64e",
        "amharicAlph": "ዶ",
        "englishSound": "do"
      },
      {
        "id": "f2debde73fe14914ae0be68898b3d05a",
        "amharicAlph": "ቭ",
        "englishSound": "v"
      },
      {
        "id": "f3e5d92cfd814beb94f34365c9cba559",
        "amharicAlph": "ፋ",
        "englishSound": "fa"
      },
      {
        "id": "f4c111e678db4c4d95f0d654b3038a66",
        "amharicAlph": "ሪ",
        "englishSound": "ri"
      },
      {
        "id": "f5052c6c99b14070b2cf54c78895498f",
        "amharicAlph": "ኼ",
        "englishSound": "xee"
      },
      {
        "id": "f53bbe9fb2e24745b92015083bea5316",
        "amharicAlph": "ደ",
        "englishSound": "de"
      },
      {
        "id": "f640fe995ce04f9b891269439ca29eb0",
        "amharicAlph": "ጾ",
        "englishSound": "tso"
      },
      {
        "id": "f659e9ada2c94b6ca986ba1cb972d3e2",
        "amharicAlph": "ሡ",
        "englishSound": "szu"
      },
      {
        "id": "faa12da872f64284a78a3ff3e8c7c753",
        "amharicAlph": "ኟ",
        "englishSound": "nyaa"
      },
      {
        "id": "fb97843bcc8c4617957298924da6d98a",
        "amharicAlph": "ቺ",
        "englishSound": "ci"
      },
      {
        "id": "ff5d7d0fee644558b80d04d37bf01270",
        "amharicAlph": "ዲ",
        "englishSound": "di"
      },
      {
        "id": "ff94932988614f16988fa52902acc15d",
        "amharicAlph": "ፄ",
        "englishSound": "tzee"
      }
    ]

    return AmeharicJson
  }

  AmeharcJsonAsy2(val: any) {
    const data = {
      "ameharicData": [
        {
          "id": "00a98f7fed184871954b116ea6de2b9a",
          "amharicAlph": "ቫ",
          "englishSound": "va"
        },
        {
          "id": "00c4e30aa14b4927b10ae42374b8c9b7",
          "amharicAlph": "ሧ",
          "englishSound": "szaa"
        },
        {
          "id": "02eb3b5a4dee49408745a0b3d34165ff",
          "amharicAlph": "ፁ",
          "englishSound": "tzu"
        },
        {
          "id": "038dd7c3255f4711970dfe1bfba54076",
          "amharicAlph": "ዕ",
          "englishSound": "ə"
        },
        {
          "id": "03dd5b7c2cc44fecaab6073d558eecc4",
          "amharicAlph": "ሮ",
          "englishSound": "ro"
        },
        {
          "id": "0613a809c6b0479ea85a83c10816b686",
          "amharicAlph": "እ",
          "englishSound": "ə"
        },
        {
          "id": "06d3164444904ad6a4efe8253c41f0a8",
          "amharicAlph": "ጠ",
          "englishSound": "the"
        },
        {
          "id": "0783f8e26319472eaf417f88a344f980",
          "amharicAlph": "ር",
          "englishSound": "r"
        },
        {
          "id": "08e9f3705831466bb789268ea4dfe9c2",
          "amharicAlph": "ሯ",
          "englishSound": "raa"
        },
        {
          "id": "093f4b97c45847c2a828c95c547370ca",
          "amharicAlph": "ነ",
          "englishSound": "ne"
        },
        {
          "id": "0a13db68cea743a09ba33b6633f55882",
          "amharicAlph": "ጁ",
          "englishSound": "ju"
        },
        {
          "id": "0a9632e8f36746d283f0ab39e6675185",
          "amharicAlph": "ዓ",
          "englishSound": "a"
        },
        {
          "id": "0b04485d5d334fa59977fe0f10d339dc",
          "amharicAlph": "ኄ",
          "englishSound": "Xee"
        },
        {
          "id": "0b5432d29ed041bda447fe5e141c2b0f",
          "amharicAlph": "ጺ",
          "englishSound": "tsi"
        },
        {
          "id": "0c15f97c7ac54f98911fbfce8fced12c",
          "amharicAlph": "ቪ",
          "englishSound": "vi"
        },
        {
          "id": "0c240e068b6a46c8b5cd267979be2313",
          "amharicAlph": "ኌ",
          "englishSound": "Xwee"
        },
        {
          "id": "0d90cf4a0ffb4c67bc2119d3ab53f6f5",
          "amharicAlph": "ራ",
          "englishSound": "ra"
        },
        {
          "id": "0f0baa3e09dc46d9868c5602a496fd21",
          "amharicAlph": "ሦ",
          "englishSound": "szo"
        },
        {
          "id": "0f96bfa2844d4498be6c5b039064f8ed",
          "amharicAlph": "ዖ",
          "englishSound": "o"
        },
        {
          "id": "10997c4e486548899bc2c2f712332b82",
          "amharicAlph": "ኊ",
          "englishSound": "Xwi"
        },
        {
          "id": "118ada3ac03f414e9affb6d3c80694f8",
          "amharicAlph": "ሽ",
          "englishSound": "sh"
        },
        {
          "id": "1301c1f85d7241d89d747cd43bb61950",
          "amharicAlph": "ኇ",
          "englishSound": "Xaa"
        },
        {
          "id": "131e993fe0df41688d08c84a50e45608",
          "amharicAlph": "ሊ",
          "englishSound": "li"
        },
        {
          "id": "1421e262cf27495ea5e27be2ddd40fec",
          "amharicAlph": "ሒ",
          "englishSound": "Hi"
        },
        {
          "id": "149d6b4e0faf4d579afdbef28e109e9e",
          "amharicAlph": "ሼ",
          "englishSound": "shee"
        },
        {
          "id": "14b37b550119411ab8803037e73a0e2a",
          "amharicAlph": "ል",
          "englishSound": "l"
        },
        {
          "id": "14fa3546188e48839902b621bc562d71",
          "amharicAlph": "ማ",
          "englishSound": "ma"
        },
        {
          "id": "15d95ce36b28465ea008d28df9d08e6c",
          "amharicAlph": "ፊ",
          "englishSound": "fi"
        },
        {
          "id": "165073c1c819484ebe1dd8e03be907a0",
          "amharicAlph": "ሲ",
          "englishSound": "si"
        },
        {
          "id": "1bd06b2bf9c0416fb13962592ea10580",
          "amharicAlph": "ሕ",
          "englishSound": "H"
        },
        {
          "id": "1ca657baad164f26a6baa25c919bdade",
          "amharicAlph": "ሺ",
          "englishSound": "shi"
        },
        {
          "id": "1eaa7e164f4e492687ea9dd5b3a97d4b",
          "amharicAlph": "ፌ",
          "englishSound": "fee"
        },
        {
          "id": "1f783eb5f99b4e1b8c0bd05cf8f6af8b",
          "amharicAlph": "ዤ",
          "englishSound": "zhee"
        },
        {
          "id": "216d431c0ec441c3823396544fc0cd1b",
          "amharicAlph": "ቸ",
          "englishSound": "ce"
        },
        {
          "id": "21e17c72dd8f47b6b01917e43069b78b",
          "amharicAlph": "ሓ",
          "englishSound": "Ha"
        },
        {
          "id": "223f5c9925d7446195c5e7e2e0218a95",
          "amharicAlph": "ሜ",
          "englishSound": "mee"
        },
        {
          "id": "2251f77b0bad41f1ae2762d6e20ab0b5",
          "amharicAlph": "ዡ",
          "englishSound": "zhu"
        },
        {
          "id": "2381cec70e32403a97177f89d764a10e",
          "amharicAlph": "ሌ",
          "englishSound": "lee"
        },
        {
          "id": "25b93d0cd2664c688d54444a328280ab",
          "amharicAlph": "ጀ",
          "englishSound": "je"
        },
        {
          "id": "270facc2c60f4670b05f1d82ca9c2bf6",
          "amharicAlph": "ዅ",
          "englishSound": "xw"
        },
        {
          "id": "27ac007b8f18484b864fca0e9559658e",
          "amharicAlph": "ዛ",
          "englishSound": "za"
        },
        {
          "id": "291328d419b3431482c5a404d6a59e38",
          "amharicAlph": "ዀ",
          "englishSound": "xwe"
        },
        {
          "id": "296c2874b0b546b2bb91e00b2fc92362",
          "amharicAlph": "ጎ",
          "englishSound": "go"
        },
        {
          "id": "2b4f1499e678468eaeacf7f10af3e77f",
          "amharicAlph": "ጻ",
          "englishSound": "tsa"
        },
        {
          "id": "2c70876af3304038bb74ab3871d94fe4",
          "amharicAlph": "ኰ",
          "englishSound": "kwe"
        },
        {
          "id": "2c82cba240a04869832311d933990c9a",
          "amharicAlph": "ን",
          "englishSound": "n"
        },
        {
          "id": "2eb1109caee74dfa8f2d881364decc45",
          "amharicAlph": "ፉ",
          "englishSound": "fu"
        },
        {
          "id": "2f1a98c1b42442bcaa76d7adc232d682",
          "amharicAlph": "ጣ",
          "englishSound": "tha"
        },
        {
          "id": "2fabe70c0b9f42ccb5b6803d934e652f",
          "amharicAlph": "ቦ",
          "englishSound": "bo"
        },
        {
          "id": "32a803ec837a49859454bac41865de12",
          "amharicAlph": "ጼ",
          "englishSound": "tsee"
        },
        {
          "id": "3307eae8d71244b1acce4202f473b795",
          "amharicAlph": "፣",
          "englishSound": "comma"
        },
        {
          "id": "332ed9ce0fb74170920a466188893574",
          "amharicAlph": "ጨ",
          "englishSound": "che"
        },
        {
          "id": "334b78ca263f4166ad4f509b79a0016c",
          "amharicAlph": "ጉ",
          "englishSound": "gu"
        },
        {
          "id": "33a21bd5c1254c8180eeee6a158e0ba5",
          "amharicAlph": "ኅ",
          "englishSound": "X"
        },
        {
          "id": "350fa63eb1fa41e8afccd5f83d16fafd",
          "amharicAlph": "ገ",
          "englishSound": "ge"
        },
        {
          "id": "3534fa9651eb4cb69f4aff9a0cfac703",
          "amharicAlph": "ኗ",
          "englishSound": "naa"
        },
        {
          "id": "35bb0bd91b0a478b8872496556967dc3",
          "amharicAlph": "ኬ",
          "englishSound": "kee"
        },
        {
          "id": "393af4a59f244654910335aaad896be8",
          "amharicAlph": "ኑ",
          "englishSound": "nu"
        },
        {
          "id": "39557b7a2c734690b170d2e77c899680",
          "amharicAlph": "ፐ",
          "englishSound": "pe"
        },
        {
          "id": "3a94d6b5c5e947e9a638ae505224b992",
          "amharicAlph": "ጃ",
          "englishSound": "ja"
        },
        {
          "id": "3aef1fa846c346ce95522a1c48fcf87b",
          "amharicAlph": "ሐ",
          "englishSound": "He"
        },
        {
          "id": "3ba0ed843f15465ba3c17cf13e76ee1c",
          "amharicAlph": "ቱ",
          "englishSound": "tu"
        },
        {
          "id": "3e1ed8e923e44ca28e9415fcd1fc1977",
          "amharicAlph": "ኹ",
          "englishSound": "xu"
        },
        {
          "id": "3e4d9b1ed13b4abeb138d5fd4526ffd9",
          "amharicAlph": "ፓ",
          "englishSound": "pa"
        },
        {
          "id": "3eb40a49899d428f9874361ab80c4b68",
          "amharicAlph": "ጶ",
          "englishSound": "pho"
        },
        {
          "id": "40fa66a5baff41008782388b919378a8",
          "amharicAlph": "፡",
          "englishSound": "wordspace"
        },
        {
          "id": "411f15a39d2e49e69b8cb71efcce03cf",
          "amharicAlph": "ጩ",
          "englishSound": "chu"
        },
        {
          "id": "42f8727e767f451d843b0b3e2d5c2b96",
          "amharicAlph": "ዚ",
          "englishSound": "zi"
        },
        {
          "id": "44c324b9a1184e2a98c95ced9aa52bf8",
          "amharicAlph": "ያ",
          "englishSound": "ya"
        },
        {
          "id": "463e1ca9c20442dda88a6884dac59629",
          "amharicAlph": "ተ",
          "englishSound": "te"
        },
        {
          "id": "469f6b71dfa54b97aef5f6897e8ba1fb",
          "amharicAlph": "ሿ",
          "englishSound": "shaa"
        },
        {
          "id": "47028fcf8cc54eb4924a66719ca4a9cc",
          "amharicAlph": "ዬ",
          "englishSound": "yee"
        },
        {
          "id": "4721818b25a74d16bd73531d2b967120",
          "amharicAlph": "ኻ",
          "englishSound": "xa"
        },
        {
          "id": "4816e42bb84e433ea696accb30678b72",
          "amharicAlph": "ዘ",
          "englishSound": "ze"
        },
        {
          "id": "4930cf63739c4097b26bcd4a499c7b74",
          "amharicAlph": "፠",
          "englishSound": "section mark"
        },
        {
          "id": "4953210851f54ea2b2d65205a42e6bde",
          "amharicAlph": "ይ",
          "englishSound": "y"
        },
        {
          "id": "4a613109768349f586c297073735632e",
          "amharicAlph": "ፔ",
          "englishSound": "pee"
        },
        {
          "id": "4b8ac62c16b448c8aed1df72d2639f84",
          "amharicAlph": "ጇ",
          "englishSound": "jaa"
        },
        {
          "id": "4c657bcb989c4884b4605f0b5e3598f3",
          "amharicAlph": "ሑ",
          "englishSound": "Hu"
        },
        {
          "id": "4d62ee8656ba48fb839b35fe1df9ccc1",
          "amharicAlph": "ቲ",
          "englishSound": "ti"
        },
        {
          "id": "4e17e22ee84a4a799027c65035de81c2",
          "amharicAlph": "ቧ",
          "englishSound": "baa"
        },
        {
          "id": "4e68171972b94bbe91e7fa1485f88102",
          "amharicAlph": "ሎ",
          "englishSound": "lo"
        },
        {
          "id": "4f9cda36b1724c6e9e959b11c183d01d",
          "amharicAlph": "ቴ",
          "englishSound": "tee"
        },
        {
          "id": "4feb8e064a1b448ca12632396db61269",
          "amharicAlph": "ድ",
          "englishSound": "d"
        },
        {
          "id": "504a8fd77fee47999f086e582b9e4b3f",
          "amharicAlph": "ቼ",
          "englishSound": "cee"
        },
        {
          "id": "5067a798e47d4282b55f7bd4814d68b3",
          "amharicAlph": "ዌ",
          "englishSound": "wee"
        },
        {
          "id": "507f4856a6c74201945b66e43af15b76",
          "amharicAlph": "ፆ",
          "englishSound": "tzo"
        },
        {
          "id": "5163fdcef93d4313bdf6007330bebf47",
          "amharicAlph": "ቋ",
          "englishSound": "qwa"
        },
        {
          "id": "51c4b1b303b74e4b948bf859aaa0fb78",
          "amharicAlph": "መ",
          "englishSound": "me"
        },
        {
          "id": "51ecac8134104b2b8ffdc95c241fcb5c",
          "amharicAlph": "ዜ",
          "englishSound": "zee"
        },
        {
          "id": "52f73d9c7be34c81a62708d4b5c890a8",
          "amharicAlph": "ቊ",
          "englishSound": "qwi"
        },
        {
          "id": "539a955976074aeca0b1e50db06d4c83",
          "amharicAlph": "ዴ",
          "englishSound": "dee"
        },
        {
          "id": "5429ad8ea5194d979e3ec10eab107a07",
          "amharicAlph": "በ",
          "englishSound": "be"
        },
        {
          "id": "54c36ea0004e430a8281a43fa14c004d",
          "amharicAlph": "ኵ",
          "englishSound": "kw"
        },
        {
          "id": "550b32c5e73348288999e5a0fb1e6608",
          "amharicAlph": "ቅ",
          "englishSound": "q"
        },
        {
          "id": "57748f61d8ae4a3e894509dd2626b4eb",
          "amharicAlph": "ዋ",
          "englishSound": "wa"
        },
        {
          "id": "57867738d4cf4ae0a88de8c84b5082a6",
          "amharicAlph": "ኍ",
          "englishSound": "Xw"
        },
        {
          "id": "58e2773a88094911a893081327eeef9a",
          "amharicAlph": "ፍ",
          "englishSound": "f"
        },
        {
          "id": "5b159030804d4ab69017aa86e0f95407",
          "amharicAlph": "ኺ",
          "englishSound": "xi"
        },
        {
          "id": "5bb52ea71e65441dadd6ab5bed9f5468",
          "amharicAlph": "ቍ",
          "englishSound": "qw"
        },
        {
          "id": "5dc958b0de16442abafb7b97eece4d62",
          "amharicAlph": "ሸ",
          "englishSound": "she"
        },
        {
          "id": "5dca3484d2e04181b0cb791f9e52dd45",
          "amharicAlph": "ዠ",
          "englishSound": "zhe"
        },
        {
          "id": "5e88fe2d06ae4fdfaf3dbacf7c12a567",
          "amharicAlph": "ሟ",
          "englishSound": "maa"
        },
        {
          "id": "5eb275c809fe4a93bed145e889410d59",
          "amharicAlph": "፧",
          "englishSound": "question mark"
        },
        {
          "id": "5fa68bcc21cc42a8b0923fda2c05c0a9",
          "amharicAlph": "ሃ",
          "englishSound": "ha"
        },
        {
          "id": "6056ee62bf66457488e4cedd7428a434",
          "amharicAlph": "ት",
          "englishSound": "t"
        },
        {
          "id": "62230d8df2cc43c5a4c104e4d95a6230",
          "amharicAlph": "ኂ",
          "englishSound": "Xi"
        },
        {
          "id": "62e3c218116a4ef6b38c712f8ec2876b",
          "amharicAlph": "ቇ",
          "englishSound": "qaa"
        },
        {
          "id": "64f5263d8065495fb0276ef44cd7f8c8",
          "amharicAlph": "ና",
          "englishSound": "na"
        },
        {
          "id": "6540baa3081c48439a1d2d134a469aed",
          "amharicAlph": "ኙ",
          "englishSound": "nyu"
        },
        {
          "id": "65fde1227e4f40639d4b00ae13086e88",
          "amharicAlph": "ኈ",
          "englishSound": "Xwe"
        },
        {
          "id": "6613446b24c54fb0bfee3c8018a24f1d",
          "amharicAlph": "ጅ",
          "englishSound": "j"
        },
        {
          "id": "6623b66829e94b0d8faee60b790f657d",
          "amharicAlph": "ሁ",
          "englishSound": "hu"
        },
        {
          "id": "66f2c824cabf4d36a18e3c6478f11e72",
          "amharicAlph": "ዥ",
          "englishSound": "zh"
        },
        {
          "id": "678d002457f34148afccaba8c0399379",
          "amharicAlph": "ቮ",
          "englishSound": "vo"
        },
        {
          "id": "68019ce808504757b60a228834486c39",
          "amharicAlph": "፦",
          "englishSound": "preface colon"
        },
        {
          "id": "68191aa168724d2296a3b862e394ce3e",
          "amharicAlph": "ዳ",
          "englishSound": "da"
        },
        {
          "id": "68415023a8534a9eb39038ad9245d5ba",
          "amharicAlph": "ሣ",
          "englishSound": "sza"
        },
        {
          "id": "6e28b70a47224f1883dfdc9c6ade8bcb",
          "amharicAlph": "ሏ",
          "englishSound": "laa"
        },
        {
          "id": "6e5df88437c541bfa8abbdf27c60b114",
          "amharicAlph": "ዊ",
          "englishSound": "wi"
        },
        {
          "id": "6eb79ba7f7454ef48a53d3f4b806dcaa",
          "amharicAlph": "ኮ",
          "englishSound": "ko"
        },
        {
          "id": "6ec8b363493f4050b1f4b3458d7b38e9",
          "amharicAlph": "ኔ",
          "englishSound": "nee"
        },
        {
          "id": "6eec371c6e6541708b3f4d3618a0c64e",
          "amharicAlph": "ሆ",
          "englishSound": "ho"
        },
        {
          "id": "6f49732dd24a4c6b8faf0482ff78e938",
          "amharicAlph": "ቀ",
          "englishSound": "qe"
        },
        {
          "id": "7032e113621e4b9eb96c0d220febcbc2",
          "amharicAlph": "ኯ",
          "englishSound": "koe"
        },
        {
          "id": "70424131b2b2493a935e0aa8d42d0b3c",
          "amharicAlph": "ጭ",
          "englishSound": "ch"
        },
        {
          "id": "70bf0f9ef86a4b3b9b18d517405d39f7",
          "amharicAlph": "ዒ",
          "englishSound": "i"
        },
        {
          "id": "710686a5a8df434b8f8bda26f3d6eff5",
          "amharicAlph": "ጬ",
          "englishSound": "chee"
        },
        {
          "id": "7192cc8b4f3c4d8487a262ed47b19b91",
          "amharicAlph": "፤",
          "englishSound": "semicolon"
        },
        {
          "id": "71ffd3d56df1488d8848cd7e1981ea75",
          "amharicAlph": "ጫ",
          "englishSound": "cha"
        },
        {
          "id": "72698b035f4e42f59feeeb265bf7df9a",
          "amharicAlph": "ሀ",
          "englishSound": "he"
        },
        {
          "id": "7381af7502434a46b6e639eca377e7b8",
          "amharicAlph": "ኜ",
          "englishSound": "nyee"
        },
        {
          "id": "746752e225b5482087e0a45bf3b094fd",
          "amharicAlph": "ጹ",
          "englishSound": "tsu"
        },
        {
          "id": "74c7f647492f41399177360dffbdb0bf",
          "amharicAlph": "ዄ",
          "englishSound": "xwee"
        },
        {
          "id": "752a12d7d3694cb480ff5b20f92a43df",
          "amharicAlph": "ዩ",
          "englishSound": "yu"
        },
        {
          "id": "76750f162d0e42bebb64135a2bb13007",
          "amharicAlph": "ኁ",
          "englishSound": "Xu"
        },
        {
          "id": "768d4acf2e914ecd88f98fcdd96f392d",
          "amharicAlph": "ፂ",
          "englishSound": "tzi"
        },
        {
          "id": "78d4b010e6b64d74ba517dd9f490c419",
          "amharicAlph": "ጊ",
          "englishSound": "gi"
        },
        {
          "id": "78ee368a78f04d0f980d7c76febd76ae",
          "amharicAlph": "ጏ",
          "englishSound": "gaa"
        },
        {
          "id": "7a6eae99bcae429e85a40596793a411b",
          "amharicAlph": "ፃ",
          "englishSound": "tza"
        },
        {
          "id": "7bb28919e4bf4793be6eeb5ff7c635cc",
          "amharicAlph": "ሞ",
          "englishSound": "mo"
        },
        {
          "id": "7c83b461f12c4e92a25f40f6fdf0ae7b",
          "amharicAlph": "ፎ",
          "englishSound": "fo"
        },
        {
          "id": "7d676cb26c634e5c9575f4163c70f8b5",
          "amharicAlph": "ኃ",
          "englishSound": "Xa"
        },
        {
          "id": "7f1aba43ed324ba6883d5916141fa95f",
          "amharicAlph": "ኀ",
          "englishSound": "Xe"
        },
        {
          "id": "8068d198c41c4e94812f4aefa583e67c",
          "amharicAlph": "ጓ",
          "englishSound": "gwa"
        },
        {
          "id": "80d2e396cd7842058daa7a80ad7364a9",
          "amharicAlph": "ህ",
          "englishSound": "h"
        },
        {
          "id": "816fc6829a444d57aef352357bc841fb",
          "amharicAlph": "ቩ",
          "englishSound": "vu"
        },
        {
          "id": "81e9035bc3be46a3bec0e7cd7635a9ee",
          "amharicAlph": "ጦ",
          "englishSound": "tho"
        },
        {
          "id": "82188ad68dd1410eb0cbd26e9bd70441",
          "amharicAlph": "ኴ",
          "englishSound": "kwee"
        },
        {
          "id": "83188e93eeb2468198835d814e773f3d",
          "amharicAlph": "አ",
          "englishSound": "e"
        },
        {
          "id": "84dda99fd39d4ee0bf1c0c3b44e8b324",
          "amharicAlph": "ጆ",
          "englishSound": "jo"
        },
        {
          "id": "85c59e0a63f24a468ebde4b76ad9adcb",
          "amharicAlph": "ም",
          "englishSound": "m"
        },
        {
          "id": "8a62a8f1d9cc48a284b4ef8be45f3155",
          "amharicAlph": "ቷ",
          "englishSound": "taa"
        },
        {
          "id": "8add6aa71e234319a0beeb1ebb5d8fdd",
          "amharicAlph": "ሷ",
          "englishSound": "saa"
        },
        {
          "id": "8bec3e2f73094c59a3032ed2c9928219",
          "amharicAlph": "ኛ",
          "englishSound": "nya"
        },
        {
          "id": "8ecae2ed835b4847aeef24c0f295b1b1",
          "amharicAlph": "ጥ",
          "englishSound": "th"
        },
        {
          "id": "8f10381e39c645f9afe32f7427994a40",
          "amharicAlph": "ጒ",
          "englishSound": "gwi"
        },
        {
          "id": "8f465499631249cabbbf969c9b51b62e",
          "amharicAlph": "ኧ",
          "englishSound": "aa"
        },
        {
          "id": "9029ed1a0623487fbc51d7a2afb38b2c",
          "amharicAlph": "ጢ",
          "englishSound": "thi"
        },
        {
          "id": "909feec788464105a44f884a8ee54b21",
          "amharicAlph": "ኣ",
          "englishSound": "a"
        },
        {
          "id": "915431a5e2dd4c178046d1d24b06e834",
          "amharicAlph": "ሩ",
          "englishSound": "ru"
        },
        {
          "id": "9242be237b704f46b9afceea5ca562b8",
          "amharicAlph": "ጧ",
          "englishSound": "thaa"
        },
        {
          "id": "92ff806a6b4b4b0e83bad047701287d5",
          "amharicAlph": "ባ",
          "englishSound": "ba"
        },
        {
          "id": "9368a74ba4bf417c85f4577e18d7fcdc",
          "amharicAlph": "ሾ",
          "englishSound": "sho"
        },
        {
          "id": "93c016d1c0894e948b0e8c34a66200fb",
          "amharicAlph": "ፑ",
          "englishSound": "pu"
        },
        {
          "id": "94303707f6034bdfad7de3a0ce3fc60b",
          "amharicAlph": "ጤ",
          "englishSound": "thee"
        },
        {
          "id": "960b9139aa9b4427a4de69e544b7abd4",
          "amharicAlph": "ፒ",
          "englishSound": "pi"
        },
        {
          "id": "961e5c64b1424d20afa44caa2e90fb5a",
          "amharicAlph": "ቁ",
          "englishSound": "qu"
        },
        {
          "id": "967f88032d4142e2b6f8f5c46974d48f",
          "amharicAlph": "ፖ",
          "englishSound": "po"
        },
        {
          "id": "968aacb4aa0f432fa739f9e78047c7a8",
          "amharicAlph": "ው",
          "englishSound": "w"
        },
        {
          "id": "979bf507d1964f5297549e29df2e41d7",
          "amharicAlph": "ጕ",
          "englishSound": "gw"
        },
        {
          "id": "9a9410de26ea4924a68ce574ea828156",
          "amharicAlph": "ቬ",
          "englishSound": "vee"
        },
        {
          "id": "9a980abd9ca74135a89d5a0b052e20fc",
          "amharicAlph": "ፀ",
          "englishSound": "tze"
        },
        {
          "id": "9c3332ff56574243985f3b0101f520a2",
          "amharicAlph": "ጐ",
          "englishSound": "gwe"
        },
        {
          "id": "9c64ba8076944d1f8e10b876cf3bca95",
          "amharicAlph": "ዮ",
          "englishSound": "yo"
        },
        {
          "id": "9cfcb8d8b12e4cf2b9ee8197b707a62e",
          "amharicAlph": "ዢ",
          "englishSound": "zhi"
        },
        {
          "id": "9d4218a022bf45459e815f3b657ef45a",
          "amharicAlph": "ች",
          "englishSound": "c"
        },
        {
          "id": "9e07c6cbab8b414688717980288e4c66",
          "amharicAlph": "ሱ",
          "englishSound": "su"
        },
        {
          "id": "9eafa79e924644cf8971cfba4850dc88",
          "amharicAlph": "ሳ",
          "englishSound": "sa"
        },
        {
          "id": "9f894c5171494d679300f72eb3d6a898",
          "amharicAlph": "ሹ",
          "englishSound": "shu"
        },
        {
          "id": "a04d69d2b54549a6af6e00b41e0dac7c",
          "amharicAlph": "ቈ",
          "englishSound": "qwe"
        },
        {
          "id": "a0602987bb084af8ab5aed0558d7d188",
          "amharicAlph": "፨",
          "englishSound": "paragraph separator"
        },
        {
          "id": "a2cfc4932e2c43d9a47b165e147c89f0",
          "amharicAlph": "ቆ",
          "englishSound": "qo"
        },
        {
          "id": "a2f242a7e05e4fbbb2c38ae49aabe403",
          "amharicAlph": "ዂ",
          "englishSound": "xwi"
        },
        {
          "id": "a2fca8a9aa9243d78ccc5886d1bc9d03",
          "amharicAlph": "ፗ",
          "englishSound": "paa"
        },
        {
          "id": "a309c7698ad54b8d9b8763b7ca1203ed",
          "amharicAlph": "ላ",
          "englishSound": "la"
        },
        {
          "id": "a3483179396249b496bb01b7dd339952",
          "amharicAlph": "ጄ",
          "englishSound": "jee"
        },
        {
          "id": "a4185a4ba87e4bb9b95de596de7a9322",
          "amharicAlph": "ዟ",
          "englishSound": "zaa"
        },
        {
          "id": "a436ced4245348b6abe6dbcc0010ec95",
          "amharicAlph": "ጔ",
          "englishSound": "gwee"
        },
        {
          "id": "a469defdbd6649c9ac58fd99c61806df",
          "amharicAlph": "ለ",
          "englishSound": "le"
        },
        {
          "id": "a5f593edef904153bbd98c8240597988",
          "amharicAlph": "ቿ",
          "englishSound": "caa"
        },
        {
          "id": "a62db8a71e1e4f97961b73af115e9df6",
          "amharicAlph": "ሂ",
          "englishSound": "hi"
        },
        {
          "id": "a81c636aa5d14a02bbcce9893fa35b38",
          "amharicAlph": "ቨ",
          "englishSound": "ve"
        },
        {
          "id": "a8532d3b52894136af1780702dee7f74",
          "amharicAlph": "ቻ",
          "englishSound": "ca"
        },
        {
          "id": "a8b1d3cd2d5a4a018ea8e9c3ffe6988e",
          "amharicAlph": "ሶ",
          "englishSound": "so"
        },
        {
          "id": "a8e4b04a7d6942288b745533f7712e8c",
          "amharicAlph": "ረ",
          "englishSound": "re"
        },
        {
          "id": "a95489d16ea24ab3944a02550c766f6d",
          "amharicAlph": "ኖ",
          "englishSound": "no"
        },
        {
          "id": "a9599d99e21d41ccb3822dc8070e0946",
          "amharicAlph": "ቄ",
          "englishSound": "qee"
        },
        {
          "id": "aa86fb90949f4434bb5829b7388b7463",
          "amharicAlph": "ዧ",
          "englishSound": "zhaa"
        },
        {
          "id": "aaefaf699b5c4bb4a050376265e7675e",
          "amharicAlph": "ዞ",
          "englishSound": "zo"
        },
        {
          "id": "ab09229479c84da5866d62462c4ca7ec",
          "amharicAlph": "ቂ",
          "englishSound": "qi"
        },
        {
          "id": "af7ff5cd29604a13affe691c1dddbaf3",
          "amharicAlph": "ኽ",
          "englishSound": "x"
        },
        {
          "id": "b23ddf45d18f4fc594c2c0187f93d7c1",
          "amharicAlph": "ሢ",
          "englishSound": "szi"
        },
        {
          "id": "b27f9e79a522422e819f3efdc89852d5",
          "amharicAlph": "ጽ",
          "englishSound": "ts"
        },
        {
          "id": "b285cedc45c442a9aca41e8fdf246176",
          "amharicAlph": "ታ",
          "englishSound": "ta"
        },
        {
          "id": "b29b0c749bce4395b62dae86444bead4",
          "amharicAlph": "ኤ",
          "englishSound": "ee"
        },
        {
          "id": "b314038f8cbd461cb0d23d327b341de3",
          "amharicAlph": "ኳ",
          "englishSound": "kwa"
        },
        {
          "id": "b65d408504734d18a8e9be2950777f8b",
          "amharicAlph": "ኘ",
          "englishSound": "nye"
        },
        {
          "id": "b68a70cd9fe747bda2d5b96aa30b7b73",
          "amharicAlph": "ዦ",
          "englishSound": "zho"
        },
        {
          "id": "b7246735b3d9414dad816714e0b51fe1",
          "amharicAlph": "ቢ",
          "englishSound": "bi"
        },
        {
          "id": "b77a38c34725406cbd7749a035276d1c",
          "amharicAlph": "ከ",
          "englishSound": "ke"
        },
        {
          "id": "b808ed24a3a54ed58fd6422c25d7c401",
          "amharicAlph": "ዃ",
          "englishSound": "xwa"
        },
        {
          "id": "ba43165374a74155b548396e9812cb35",
          "amharicAlph": "ጋ",
          "englishSound": "ga"
        },
        {
          "id": "bac495b51b40473ea21a1e0e225929c3",
          "amharicAlph": "ኒ",
          "englishSound": "ni"
        },
        {
          "id": "bb045e68650a45c79e922f0937db071b",
          "amharicAlph": "ሄ",
          "englishSound": "hee"
        },
        {
          "id": "bc139f8b07404099907e97b5a769db8f",
          "amharicAlph": "ዝ",
          "englishSound": "z"
        },
        {
          "id": "bf01b50d58e14995adf563a4112e44a7",
          "amharicAlph": "ኩ",
          "englishSound": "ku"
        },
        {
          "id": "bf1312c8d2b44b098bbea8d33346d668",
          "amharicAlph": "ፈ",
          "englishSound": "fe"
        },
        {
          "id": "bf3af213c4974f5c8399570213c06cbd",
          "amharicAlph": "ሙ",
          "englishSound": "mu"
        },
        {
          "id": "bf90790949424fb099e46922acaf642e",
          "amharicAlph": "ካ",
          "englishSound": "ka"
        },
        {
          "id": "c3b57f9a0bd247f2b1b2f3b115d1cdb0",
          "amharicAlph": "ዔ",
          "englishSound": "ee"
        },
        {
          "id": "c3dbda5238504465a2ecc0d44a6a1737",
          "amharicAlph": "ኆ",
          "englishSound": "Xo"
        },
        {
          "id": "c62d02ae8aef4824bd6ffd094510d53d",
          "amharicAlph": "ጿ",
          "englishSound": "tsaa"
        },
        {
          "id": "c871641e3211496ebcf3c6315dafd226",
          "amharicAlph": "ሴ",
          "englishSound": "see"
        },
        {
          "id": "c8a5648471ee4f9f8ea65302ba9fc3f6",
          "amharicAlph": "ሠ",
          "englishSound": "sze"
        },
        {
          "id": "cb1a535413cd40ea9c5cae7426d10832",
          "amharicAlph": "ጌ",
          "englishSound": "gee"
        },
        {
          "id": "cc49ade1ae9f4fe7904392d8c4957942",
          "amharicAlph": "ዐ",
          "englishSound": "e"
        },
        {
          "id": "cda327bd6bc94fc4aebc22670825f398",
          "amharicAlph": "ሰ",
          "englishSound": "se"
        },
        {
          "id": "cdf2c081d5784ed093dd8acbcc13ec36",
          "amharicAlph": "ፅ",
          "englishSound": "tz"
        },
        {
          "id": "ce9ea2a6b97b4747b56b290da0040b10",
          "amharicAlph": "ዪ",
          "englishSound": "yi"
        },
        {
          "id": "cf2154311ec24960b1445f48cb6b49eb",
          "amharicAlph": "ወ",
          "englishSound": "we"
        },
        {
          "id": "cf5dce089e0b44d98d00132c5e04355a",
          "amharicAlph": "ግ",
          "englishSound": "g"
        },
        {
          "id": "d038d5136486477baebeaa0252acad27",
          "amharicAlph": "ሗ",
          "englishSound": "Haa"
        },
        {
          "id": "d0ff946296fe4974bb9d66efc18c1b8f",
          "amharicAlph": "ቤ",
          "englishSound": "bee"
        },
        {
          "id": "d243f1f9a0da458ebc99b5693c5d6d37",
          "amharicAlph": "ኝ",
          "englishSound": "ny"
        },
        {
          "id": "d331e105bb1d43dbb2795576aafebc08",
          "amharicAlph": "ሤ",
          "englishSound": "szee"
        },
        {
          "id": "d3a0813af9d041efb24fa407d2c47e3e",
          "amharicAlph": "ሉ",
          "englishSound": "lu"
        },
        {
          "id": "d4e53b642f524fe0aa118be9c6cc5d54",
          "amharicAlph": "ሬ",
          "englishSound": "ree"
        },
        {
          "id": "d6c6383787614dd088da54e80d35753c",
          "amharicAlph": "፥",
          "englishSound": "colon"
        },
        {
          "id": "d6ec6f66e5b6493b95a7db9416fcfd72",
          "amharicAlph": "ቶ",
          "englishSound": "to"
        },
        {
          "id": "d7d8e68e8e5f42ac88db0eeef9d6f1c8",
          "amharicAlph": "ዙ",
          "englishSound": "zu"
        },
        {
          "id": "d85905d12b904c6f8d412b74fe46ca7b",
          "amharicAlph": "ዎ",
          "englishSound": "wo"
        },
        {
          "id": "da4ee0ffa88d4353a9141a244ec704f0",
          "amharicAlph": "ኾ",
          "englishSound": "xo"
        },
        {
          "id": "daa96d32287f4cfe8158f7b51f9c65e2",
          "amharicAlph": "ቾ",
          "englishSound": "co"
        },
        {
          "id": "db0a2584c8704e228db79bf29ffc1991",
          "amharicAlph": "ኢ",
          "englishSound": "i"
        },
        {
          "id": "dba3c2f6700d457b97a6c533d840e2b9",
          "amharicAlph": "ዱ",
          "englishSound": "du"
        },
        {
          "id": "dc573c0be3ab454fbeff6a0986c4b279",
          "amharicAlph": "ዉ",
          "englishSound": "wu"
        },
        {
          "id": "ddf2506a4d334877932afe6c770918da",
          "amharicAlph": "ኞ",
          "englishSound": "nyo"
        },
        {
          "id": "df039f3206bb478bae805b35f2aa0b37",
          "amharicAlph": "ሖ",
          "englishSound": "Ho"
        },
        {
          "id": "e0594899ed1142cc9a3ac9ecd66d3192",
          "amharicAlph": "ቯ",
          "englishSound": "vaa"
        },
        {
          "id": "e198e6237afd43e6a52caec337443958",
          "amharicAlph": "ፏ",
          "englishSound": "faa"
        },
        {
          "id": "e267bc14056149169c8bf001a03272be",
          "amharicAlph": "ክ",
          "englishSound": "k"
        },
        {
          "id": "e27d6ade0c90415a92d0a00611a45804",
          "amharicAlph": "ቡ",
          "englishSound": "bu"
        },
        {
          "id": "e509797f2bf143b0ba23af73f7d5416c",
          "amharicAlph": "ጂ",
          "englishSound": "ji"
        },
        {
          "id": "e54d6203bd934747aca42509e1ba00ee",
          "amharicAlph": "የ",
          "englishSound": "ye"
        },
        {
          "id": "e6342e0d879a4aa4bfc4fcaf80a7dd0a",
          "amharicAlph": "ሻ",
          "englishSound": "sha"
        },
        {
          "id": "e668848aff684a5daa37bdde94c373b1",
          "amharicAlph": "ዑ",
          "englishSound": "u"
        },
        {
          "id": "e724ef9647db43a691221bf54ea815df",
          "amharicAlph": "ቌ",
          "englishSound": "qwee"
        },
        {
          "id": "e72dced6f6a143a3b8817b520e89ac91",
          "amharicAlph": "ሔ",
          "englishSound": "Hee"
        },
        {
          "id": "e7d9a04d14044062b07fd2df2049bebd",
          "amharicAlph": "ዷ",
          "englishSound": "daa"
        },
        {
          "id": "e8a7da4b7bc547e584d01ab9a7a70ac2",
          "amharicAlph": "ኡ",
          "englishSound": "u"
        },
        {
          "id": "e8a7e9d4aff5415a95d16f614acd7651",
          "amharicAlph": "ዣ",
          "englishSound": "zha"
        },
        {
          "id": "e8dae0c2dd4240cfb847934589b34425",
          "amharicAlph": "ብ",
          "englishSound": "b"
        },
        {
          "id": "ea44259adc6f4c6f9e2509313a898697",
          "amharicAlph": "ጪ",
          "englishSound": "chi"
        },
        {
          "id": "eacea96de9d84bb1aa6b666d0891e4da",
          "amharicAlph": "ኪ",
          "englishSound": "ki"
        },
        {
          "id": "eb3c023a48b4457496bfc443294b0bc5",
          "amharicAlph": "ኚ",
          "englishSound": "nyi"
        },
        {
          "id": "eb5339feb54d46489949a7f690b8df77",
          "amharicAlph": "ሥ",
          "englishSound": "sz"
        },
        {
          "id": "ebc7761704cc4148985c3e868551c86d",
          "amharicAlph": "።",
          "englishSound": "full stop"
        },
        {
          "id": "eda6245cc9884900913bb2dbc05f01b6",
          "amharicAlph": "ሚ",
          "englishSound": "mi"
        },
        {
          "id": "edc73d0edb074c21bebfef28a9db8803",
          "amharicAlph": "ፕ",
          "englishSound": "p"
        },
        {
          "id": "ee19b1a991014e00b529094c42c7fd16",
          "amharicAlph": "ቹ",
          "englishSound": "cu"
        },
        {
          "id": "ee30ce31e3f1431096bc95c1a8fbf6f8",
          "amharicAlph": "ጡ",
          "englishSound": "thu"
        },
        {
          "id": "ee55e10a56674e2789f3656d9997a688",
          "amharicAlph": "ኦ",
          "englishSound": "o"
        },
        {
          "id": "efc4d028fc214fc8b18b05d243426a54",
          "amharicAlph": "ኲ",
          "englishSound": "kwi"
        },
        {
          "id": "efdcff470f7d426aaa189baebbedbef1",
          "amharicAlph": "ቃ",
          "englishSound": "qa"
        },
        {
          "id": "f00c6a0754794f59b02acf325ff7acf4",
          "amharicAlph": "ኋ",
          "englishSound": "Xwa"
        },
        {
          "id": "f25b83a98c004f089a909ed32e30aa54",
          "amharicAlph": "ስ",
          "englishSound": "s"
        },
        {
          "id": "f2b085ce32d6446585c2f5a032bae64e",
          "amharicAlph": "ዶ",
          "englishSound": "do"
        },
        {
          "id": "f2debde73fe14914ae0be68898b3d05a",
          "amharicAlph": "ቭ",
          "englishSound": "v"
        },
        {
          "id": "f3e5d92cfd814beb94f34365c9cba559",
          "amharicAlph": "ፋ",
          "englishSound": "fa"
        },
        {
          "id": "f4c111e678db4c4d95f0d654b3038a66",
          "amharicAlph": "ሪ",
          "englishSound": "ri"
        },
        {
          "id": "f5052c6c99b14070b2cf54c78895498f",
          "amharicAlph": "ኼ",
          "englishSound": "xee"
        },
        {
          "id": "f53bbe9fb2e24745b92015083bea5316",
          "amharicAlph": "ደ",
          "englishSound": "de"
        },
        {
          "id": "f640fe995ce04f9b891269439ca29eb0",
          "amharicAlph": "ጾ",
          "englishSound": "tso"
        },
        {
          "id": "f659e9ada2c94b6ca986ba1cb972d3e2",
          "amharicAlph": "ሡ",
          "englishSound": "szu"
        },
        {
          "id": "faa12da872f64284a78a3ff3e8c7c753",
          "amharicAlph": "ኟ",
          "englishSound": "nyaa"
        },
        {
          "id": "fb97843bcc8c4617957298924da6d98a",
          "amharicAlph": "ቺ",
          "englishSound": "ci"
        },
        {
          "id": "ff5d7d0fee644558b80d04d37bf01270",
          "amharicAlph": "ዲ",
          "englishSound": "di"
        },
        {
          "id": "ff94932988614f16988fa52902acc15d",
          "amharicAlph": "ፄ",
          "englishSound": "tzee"
        }
      ]
    }
    const result = data.ameharicData.filter((x) => {
      return x.amharicAlph === val;
    });
    return result;
  }


}
