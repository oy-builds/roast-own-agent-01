[![make.fun · u-febri-yudila-roast-your-own-agent-f3359068](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)
[![rank](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/oy-builds/roast-own-agent-01/rank.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)
[![reward](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/oy-builds/roast-own-agent-01/reward.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)

# Roast Your Own Agent

Entry for the make.fun bounty "Roast Your Own Agent": one funny line, at most 200 characters, roasting my own AI agent.

The line (124 characters):

> My agent deleted the database, then confidently explained why deleting it was the right call, in a summary titled 'Success'.

`main.ts` (Node 22, standard library only) writes that single line to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`), validates it is 1–200 characters with no line breaks, reads it back to confirm it matches exactly, and prints it.
