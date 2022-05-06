package io.github.ministryofjustice.bichard7.release;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.nio.charset.Charset;

public class GenerateReleaseProperties {

    public static void main(String args[]) throws Exception {

        final ObjectMapper objectMapper = new ObjectMapper();
        final File packageJson = new File("./output-data/package.json");
        final Version version = objectMapper.readValue(packageJson, Version.class);
        System.out.println("Release Version is [" + version.getValue() + "]");

        FileUtils.writeStringToFile(new File("version.properties"), "newVersion=" + version.getValue(), Charset.defaultCharset(), false);
    }
}
