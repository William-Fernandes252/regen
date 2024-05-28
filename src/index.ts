#!/usr/bin/env node

import { commands } from "@/commands";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv)).command(commands).parse();
