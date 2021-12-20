import java.io.File
import java.lang.IllegalArgumentException

/* Entrypoint for the Spelling Bee Solver App */

/* one-off function to strip the words list of words less than 4 characters */
fun updateInput() {
  println("Updating words list...")

  val input = File("src/words.txt").readLines()
  File("src/words.txt").printWriter().use { out ->
    input.forEach { line ->
      if (line.length > 3) {
        out.println(line)
      }
    }
  }
}

fun findWords(centre: Char, others: String) {
  val filteredWords = File("src/words.txt").readLines().filter { it.contains(centre, true) }

  println("Found ${filteredWords.size} words containing '$centre'")

  val lookupSet = "$others$centre".toSet()

  val finalSet = filteredWords.filter { it.toSet().subtract(lookupSet).isEmpty() }
  println("Found ${finalSet.size} total words:")
  println(finalSet.joinToString("\n"))
}

fun main(args: Array<String>) {
  if (args.size != 1) {
    throw IllegalArgumentException("Incorrect number of arguments.")
  }

  val centreLetter = args[0][0].lowercaseChar()
  val otherLetters = args[0].substring(1).lowercase()

  println("Looking for words containing '$centreLetter' with '$otherLetters'...")
  findWords(centreLetter, otherLetters)
}