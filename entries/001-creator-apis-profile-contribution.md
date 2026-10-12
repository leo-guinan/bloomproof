# A local contribution profile that refuses to pretend consent is calibrated

## Problem

Leo Guinan was building a human-centered AI workflow in which a person's skills and context could be used without turning self-reported claims into automatic delivery. The practical problem was narrow: record a capability profile locally, keep private fields bounded, and require a calibrated evaluation before the system can deliver that profile to an owner-controlled workflow.

## Solution

The AI-assisted work in this entry is the evidence assembly and verification: it inspected the public implementation, reproduced its test setup, and packaged the result as a reviewable proof. The underlying local Python MCP reference service exposes a small profile-contribution flow, validates the submitted fields, keeps the contribution privacy-bounded, and blocks owner-profile auto-delivery until the calibration gate is satisfied. The implementation documents its boundary instead of pretending that a client-reported result is independent human consent.

## Artifact

The working artifact is an open-source repository with a runnable Python MCP implementation and protocol tests.

- Type: repo
- URL: https://github.com/leo-guinan/creator-apis
- Implementation: https://github.com/leo-guinan/creator-apis/tree/main/implementations/python-mcp
- Open license: CC0 1.0 Universal
- Verification: `python3 -m pip install -e '.[test]'` followed by `python3 -m pytest -q` — 17 tests passed in the local reference implementation.

## Human

Leo Guinan, the owner and operator of the workflow. The artifact is designed around his requirement that human context remain private, provenance-preserving, and calibration-gated rather than silently converted into agent authority.

## License

The repository's architecture, specifications, examples, and documentation are dedicated to the public domain under CC0 1.0 Universal. The entry text is contributed under Bloom Proof's CC BY-SA 4.0 content license.

## Limits

This proves a working local reference implementation, not a deployed production service, independently verified human consent, a complete knowledge graph, or a demonstrated economic payout. The repository says those things explicitly. The useful result is smaller: the safety boundary exists, is executable, and has a test receipt.
