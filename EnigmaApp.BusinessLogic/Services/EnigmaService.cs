using EnigmaApp.Domain.Abstractions;
using EnigmaApp.Domain.Models;
using System.Text;

namespace EnigmaApp.BusinessLogic.Services
{
    public class EnigmaService : IEnigmaService
    {
        private const string Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        public OutputEnigmaModel Encrypt(string text, EnigmaModel enigmaModel)
        {
            if (string.IsNullOrEmpty(text))
                throw new Exception("Text not set");

            if (enigmaModel == null)
                throw new Exception("Enigma model not set");

            StringBuilder word = new StringBuilder();
            List<char> lastCharLetters = new List<char>();

            Rotor rotor1 = enigmaModel.Rotor1;
            Rotor rotor2 = enigmaModel.Rotor2;
            Rotor rotor3 = enigmaModel.Rotor3;

            for (int i = 0; i < text.Length; i++)
            {
                List<char> letters = new List<char>();

                rotor1.InnerShift++;
                rotor1.InnerShift %= Alphabet.Length;
                char letter = char.ToUpper(text[i]);
                letters.Add(letter);

                // Direct passage
                letter = GetLetterFromPatchPanel(letter, enigmaModel.PatchPanelText, Passage.Direct);
                letters.Add(letter);

                letter = Rotate(letter, RotorDirection.Right, rotor1.InnerShift);
                letters.Add(letter);

                TryChangeRotorShift(rotor1.InnerShift, rotor1.Turnover, rotor2);

                letter = GetLetterFromRotor(letter, rotor1, Passage.Direct);
                letters.Add(letter);

                int shift12 = (rotor1.InnerShift - rotor2.InnerShift) % Alphabet.Length;

                letter = Rotate(letter, RotorDirection.Left, shift12);
                letters.Add(letter);

                TryChangeRotorShift(rotor2.InnerShift, rotor2.Turnover, rotor3);

                letter = GetLetterFromRotor(letter, rotor2, Passage.Direct);
                letters.Add(letter);

                int shift23 = (rotor3.InnerShift - rotor2.InnerShift) % Alphabet.Length;

                letter = Rotate(letter, RotorDirection.Right, shift23);
                letters.Add(letter);

                letter = GetLetterFromRotor(letter, rotor3, Passage.Direct);
                letters.Add(letter);

                letter = Rotate(letter, RotorDirection.Left, rotor3.InnerShift);
                letters.Add(letter);

                letter = GetLetterFromReflector(letter, enigmaModel.ReflectorText);
                letters.Add(letter);

                // Back passage
                letter = Rotate(letter, RotorDirection.Right, rotor3.InnerShift);
                letters.Add(letter);

                letter = GetLetterFromRotor(letter, rotor3, Passage.Back);
                letters.Add(letter);

                letter = Rotate(letter, RotorDirection.Left, shift23);
                letters.Add(letter);

                letter = GetLetterFromRotor(letter, rotor2, Passage.Back);
                letters.Add(letter);

                letter = Rotate(letter, RotorDirection.Right, shift12);
                letters.Add(letter);

                letter = GetLetterFromRotor(letter, rotor1, Passage.Back);
                letters.Add(letter);

                letter = Rotate(letter, RotorDirection.Left, rotor1.InnerShift);
                letters.Add(letter);

                letter = GetLetterFromPatchPanel(letter, enigmaModel.PatchPanelText, Passage.Back);
                letters.Add(letter);

                word.Append(letter);
                lastCharLetters = letters;
            }

            return new OutputEnigmaModel
            {
                Text = word.ToString(),
                LastCharLetters = lastCharLetters
            };
        }

        public char GetLetterFromPatchPanel(char letter, string patchPanel, Passage passage)
        {
            return GetLetterFromDevice(letter, patchPanel, passage);
        }

        public char GetLetterFromRotor(char letter, Rotor rotor, Passage passage)
        {
            return GetLetterFromDevice(letter, rotor.Text, passage);
        }

        public char GetLetterFromReflector(char letter, string reflectorText)
        {
            return GetLetterFromDevice(letter, reflectorText, Passage.Direct);
        }

        private char GetLetterFromDevice(char letter, string element, Passage passage)
        {
            char outputLetter = ' ';
            int letterIndex;
            letter = char.ToUpper(letter);

            switch (passage)
            {
                case Passage.Direct:
                    letterIndex = Alphabet.IndexOf(letter);
                    if (letterIndex < 0)
                        throw new ArgumentException("This letter is not in the Alphabet");
                    outputLetter = element[letterIndex];
                    break;
                case Passage.Back:
                    letterIndex = element.IndexOf(letter);
                    if (letterIndex < 0)
                        throw new ArgumentException("This letter is not in the Alphabet");
                    outputLetter = Alphabet[letterIndex];
                    break;
            }

            return char.ToUpper(outputLetter);
        }

        public char Rotate(char letter, RotorDirection direction, int shift)
        {
            int letterIndex = Alphabet.IndexOf(char.ToUpper(letter));

            if (letterIndex < 0)
                throw new ArgumentException("This letter is not in the alphabet");

            return direction switch
            {
                RotorDirection.Left => Alphabet[((letterIndex - shift) + Alphabet.Length) % Alphabet.Length],
                RotorDirection.Right => Alphabet[((letterIndex + shift) + Alphabet.Length) % Alphabet.Length],
                _ => ' '
            };
        }

        public void TryChangeRotorShift(int shift, string turnover, Rotor changeableRotor)
        {
            for (int i = 0; i < turnover.Length; i++)
                if (shift - 1 == Alphabet.IndexOf(turnover[i]))
                    changeableRotor.InnerShift++;
        }
    }
}
