const fs = require('fs');
const path = require('path');

/**
 * Recursively copy directory contents
 * @param {string} srcDir - Source directory
 * @param {string} destDir - Destination directory
 */
const copyDirectorySync = (srcDir, destDir) => {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

/**
 * Recursively compare directory contents
 * @param {string} actualDir - Actual output directory
 * @param {string} expectedDir - Expected output directory
 * @returns {Array} Array of differences found
 */
const compareDirectories = (actualDir, expectedDir) => {
  const differences = [];

  if (!fs.existsSync(expectedDir)) {
    differences.push(`Expected directory does not exist: ${expectedDir}`);
    return differences;
  }

  const expectedEntries = fs.readdirSync(expectedDir, { withFileTypes: true });
  const actualEntries = fs.readdirSync(actualDir, { withFileTypes: true });

  // Check for missing files in actual
  for (const entry of expectedEntries) {
    const expectedPath = path.join(expectedDir, entry.name);
    const actualPath = path.join(actualDir, entry.name);

    if (!fs.existsSync(actualPath)) {
      differences.push(`Missing file/directory: ${entry.name}`);
      continue;
    }

    if (entry.isDirectory()) {
      const subDifferences = compareDirectories(actualPath, expectedPath);
      differences.push(...subDifferences.map((diff) => `${entry.name}/${diff}`));
    } else {
      // Compare file contents
      const expectedContent = fs.readFileSync(expectedPath, 'utf8');
      const actualContent = fs.readFileSync(actualPath, 'utf8');

      if (expectedContent.trim() !== actualContent.trim()) {
        differences.push(`File content mismatch: ${entry.name}`);
      }
    }
  }

  // Check for extra files in actual
  for (const entry of actualEntries) {
    const expectedPath = path.join(expectedDir, entry.name);

    if (!fs.existsSync(expectedPath)) {
      differences.push(`Unexpected file/directory: ${entry.name}`);
    }
  }

  return differences;
};

/**
 * Copy only files from actual directory that correspond to expected structure
 * This excludes test infrastructure files and only copies files that should exist
 * @param {string} expectedSrcDir - Expected directory structure
 * @param {string} actualSrcDir - Actual directory with results
 * @param {string} actualDestDir - Destination for filtered actual results
 */
const copyExpectedFilesFromActual = (expectedSrcDir, actualSrcDir, actualDestDir) => {
  const expectedEntries = fs.readdirSync(expectedSrcDir, { withFileTypes: true });

  for (const entry of expectedEntries) {
    // Skip any files starting with TEST_MORPHLET (shouldn't be in expected anyway)
    if (entry.name.startsWith('TEST_MORPHLET')) {
      continue;
    }

    const expectedPath = path.join(expectedSrcDir, entry.name);
    const actualSourcePath = path.join(actualSrcDir, entry.name);
    const actualDestPath = path.join(actualDestDir, entry.name);

    if (entry.isDirectory()) {
      if (fs.existsSync(actualSourcePath)) {
        fs.mkdirSync(actualDestPath, { recursive: true });
        copyExpectedFilesFromActual(expectedPath, actualSourcePath, actualDestPath);
      }
    } else {
      // Only copy the file if it exists in the actual results and is not test infrastructure
      if (fs.existsSync(actualSourcePath) && !entry.name.startsWith('TEST_MORPHLET')) {
        fs.copyFileSync(actualSourcePath, actualDestPath);
      }
    }
  }
};

module.exports = {
  copyDirectorySync,
  compareDirectories,
  copyExpectedFilesFromActual,
};
