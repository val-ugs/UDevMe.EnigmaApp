using EnigmaApp.BusinessLogic.Services;
using EnigmaApp.Domain.Models;

namespace EnigmaApp.Tests
{
    public class EngimaServiceTests
    {
        private const string _patchPanelText = "ABIDEFGHCJKLMNOPQUSTRVWXYZ";
        private Rotor _rotor1;
        private Rotor _rotor2;
        private Rotor _rotor3;
        private const string _reflectorBText = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

        private EnigmaService _enigmaService;

        [SetUp]
        public void Setup()
        {
            _rotor1 = new Rotor
            {
                Id = 1,
                Text = "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
                Turnover = "Q",
                InnerShift = 0
            };

            _rotor2 = new Rotor
            {
                Id = 2,
                Text = "AJDKSIRUXBLHWTMCQGZNPYFVOE",
                Turnover = "E",
                InnerShift = 0
            };

            _rotor3 = new Rotor
            {
                Id = 3,
                Text = "BDFHJLCPRTXVZNYEIWGAKMUSQO",
                Turnover = "V",
                InnerShift = 0
            };

            _enigmaService = new EnigmaService();
        }

        [TestCase('a', Passage.Direct, 'A')]
        [TestCase('C', Passage.Direct, 'I')]
        [TestCase('a', Passage.Back, 'A')]
        [TestCase('I', Passage.Back, 'C')]
        public void GetLetterFromPatchPanel__ShouldReturnTrue(char inputLetter, Passage passage, char expectedLetter)
        {
            // arrange

            // act
            char result = _enigmaService.GetLetterFromPatchPanel(inputLetter, _patchPanelText, passage);

            // assert
            Assert.That(expectedLetter, Is.EqualTo(result));
        }

        [TestCase('1', Passage.Direct)]
        [TestCase(' ', Passage.Direct)]
        [TestCase('á', Passage.Direct)]
        [TestCase('1', Passage.Back)]
        [TestCase(' ', Passage.Back)]
        [TestCase('á', Passage.Back)]
        public void GetLetterFromPatchPanel__ShouldThrowArgumentException(char inputLetter, Passage passage)
        {
            // arrange

            // act

            // assert
            Assert.Throws<ArgumentException>(() => _enigmaService.GetLetterFromPatchPanel(inputLetter, _patchPanelText, passage));
        }

        [Test]
        public void GetLetterFromPatchPanel__ShouldReturnFalse()
        {
            // arrange
            char inputLetter = 'A';
            Passage passage = (Passage)3;
            char expectedLetter = 'A';

            // act
            char result = _enigmaService.GetLetterFromPatchPanel(inputLetter, _patchPanelText, passage);

            // assert
            Assert.That(expectedLetter, Is.Not.EqualTo(result));
        }

        [TestCase('a', RotorDirection.Right, 1, 'B')]
        [TestCase('C', RotorDirection.Right, 3, 'F')]
        [TestCase('a', RotorDirection.Left, 1, 'Z')]
        [TestCase('C', RotorDirection.Left, 4, 'Y')]
        public void Rotate__ShouldReturnTrue(char inputLetter, RotorDirection direction,
                                             int shift, char expectedLetter)
        {
            // arrange

            // act
            char result = _enigmaService.Rotate(inputLetter, direction, shift);

            // assert
            Assert.That(expectedLetter, Is.EqualTo(result));
        }

        [TestCase('1', RotorDirection.Right, 1)]
        [TestCase(' ', RotorDirection.Right, 3)]
        [TestCase('á', RotorDirection.Right, 1)]
        [TestCase('1', RotorDirection.Left, 1)]
        [TestCase(' ', RotorDirection.Left, 3)]
        [TestCase('á', RotorDirection.Left, 1)]
        public void Rotate__ShouldThrowArgumentException(char inputLetter, RotorDirection direction, int shift)
        {
            // arrange

            // act

            // assert
            Assert.Throws<ArgumentException>(() => _enigmaService.Rotate(inputLetter, direction, shift));
        }

        [Test]
        public void Rotate__ShouldReturnFalse()
        {
            // arrange
            char inputLetter = 'A';
            RotorDirection direction = (RotorDirection)3;
            int shift = 2;
            char expectedLetter = 'C';

            // act
            char result = _enigmaService.Rotate(inputLetter, direction, shift);

            // assert
            Assert.That(expectedLetter, Is.Not.EqualTo(result));
        }

        [Test]
        public void TryChangeRotorShift__ShouldReturnTrue()
        {
            // arrange
            int shift = 25;
            string turnover = _rotor1.Turnover;
            int expectedInnerShift = ++_rotor2.InnerShift;

            // act
            _enigmaService.TryChangeRotorShift(shift, turnover, _rotor2);

            // assert
            Assert.That(expectedInnerShift, Is.EqualTo(_rotor2.InnerShift));
        }

        [Test]
        public void TryChangeRotorShift__ShouldReturnFalse()
        {
            // arrange
            int shift = 25;
            string turnover = _rotor1.Turnover;
            int expectedInnerShift = _rotor2.InnerShift + 2;

            // act
            _enigmaService.TryChangeRotorShift(shift, turnover, _rotor2);

            // assert
            Assert.That(expectedInnerShift, Is.Not.EqualTo(_rotor2.InnerShift));
        }

        [TestCase('a', Passage.Direct, 'E')]
        [TestCase('A', Passage.Direct, 'E')]
        [TestCase('e', Passage.Back, 'A')]
        [TestCase('E', Passage.Back, 'A')]
        public void GetLetterFromRotor__ShouldReturnTrue(char inputletter, Passage passage, char expectedLetter)
        {
            // arrange

            // act
            char result = _enigmaService.GetLetterFromRotor(inputletter, _rotor1, passage);

            // assert
            Assert.That(expectedLetter, Is.EqualTo(result));
        }

        [TestCase('1', Passage.Direct)]
        [TestCase(' ', Passage.Direct)]
        [TestCase('á', Passage.Direct)]
        [TestCase('1', Passage.Back)]
        [TestCase(' ', Passage.Back)]
        [TestCase('á', Passage.Back)]
        public void GetLetterFromRotor__ShouldThrowArgumentException(char inputLetter, Passage passage)
        {
            // arrange

            // act

            // assert
            Assert.Throws<ArgumentException>(() => _enigmaService.GetLetterFromRotor(inputLetter, _rotor1, passage));
        }

        [Test]
        public void GetLetterFromRotor__ShouldReturnFalse()
        {
            // arrange
            char inputLetter = 'A';
            Passage passage = (Passage)3;
            char expectedLetter = 'E';

            // act
            char result = _enigmaService.GetLetterFromRotor(inputLetter, _rotor1, passage);

            // assert
            Assert.That(expectedLetter, Is.Not.EqualTo(result));
        }

        [TestCase('a', 'Y')]
        [TestCase('A', 'Y')]
        public void GetLetterFromReflector__ShouldReturnTrue(char inputletter, char expectedLetter)
        {
            // arrange

            // act
            char result = _enigmaService.GetLetterFromReflector(inputletter, _reflectorBText);

            // assert
            Assert.That(expectedLetter, Is.EqualTo(result));
        }

        [TestCase('1')]
        [TestCase(' ')]
        [TestCase('á')]
        public void GetLetterFromReflector__ShouldThrowArgumentException(char inputLetter)
        {
            // arrange

            // act

            // assert
            Assert.Throws<ArgumentException>(() => _enigmaService.GetLetterFromReflector(inputLetter, _reflectorBText));
        }

        [Test]
        public void Encrypt__ShouldReturnTrue()
        {
            // arrange
            string text = "CAT";
            EnigmaModel enigmaModel = new EnigmaModel
            {
                PatchPanelText = _patchPanelText,
                Rotor1 = _rotor1,
                Rotor2 = _rotor2,
                Rotor3 = _rotor3,
                ReflectorText = _reflectorBText
            };

            OutputEnigmaModel expectedOutput= new OutputEnigmaModel
            {
                Text = "LTE",
                LastCharLetters = new List<char> { 'T', 'T', 'W', 'B', 'Y', 'O', 'O', 'Y', 'Y',
                                                   'A', 'A', 'T', 'T', 'N', 'Q', 'H', 'E', 'E'},
            };

            // act
            OutputEnigmaModel result = _enigmaService.Encrypt(text, enigmaModel);

            // assert
            Assert.That(expectedOutput.Text, Is.EqualTo(result.Text));
            CollectionAssert.AreEqual(expectedOutput.LastCharLetters, result.LastCharLetters);
        }

        [Test]
        public void Encrypt__ShouldThrowException()
        {
            // arrange
            string text = "CAT";
            EnigmaModel enigmaModel = new EnigmaModel
            {
                PatchPanelText = _patchPanelText,
                Rotor1 = _rotor1,
                Rotor2 = _rotor2,
                Rotor3 = _rotor3,
                ReflectorText = _reflectorBText
            };

            // act

            // assert
            Assert.Throws<Exception>(() => _enigmaService.Encrypt(text, null));
            Assert.Throws<Exception>(() => _enigmaService.Encrypt(null, enigmaModel));
            Assert.Throws<Exception>(() => _enigmaService.Encrypt("", enigmaModel));
        }
    }
}