/*
* Copyright 2010 Research In Motion Limited.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

#include <stdio.h>
#include <unistd.h>
#include <limits.h>
#include <string.h>

#include <libxml/parser.h>
#include <libxml/tree.h>
#include <libxml/xpath.h>

xmlChar* get_java_home(char *current_path)
{
  char path_to_bbwp_properties[PATH_MAX+1];

  strncpy(path_to_bbwp_properties, current_path, PATH_MAX+1);
        strncat(path_to_bbwp_properties, "/bin/bbwp.properties", PATH_MAX+1);

  xmlDocPtr doc = xmlParseFile(path_to_bbwp_properties);
  if (doc == NULL) {
         printf("error: could not parse file %s\n", path_to_bbwp_properties);
        }

        xmlXPathContextPtr context = xmlXPathNewContext(doc);
        xmlChar * xpath = "/wcp/java";
  xmlNodeSetPtr nodeset;
        xmlXPathObjectPtr result = xmlXPathEvalExpression(xpath, context);
  xmlChar *java_home;

  if(xmlXPathNodeSetIsEmpty(result->nodesetval)){
                printf("No result\n");
  } else {
        nodeset = result->nodesetval;
        java_home = xmlNodeListGetString(doc, nodeset->nodeTab[0]->xmlChildrenNode, 1);
  }

        xmlFreeDoc(doc);
  xmlXPathFreeContext(context);
  xmlXPathFreeObject(result);

        /*
         * Free the global variables that may
         * have been allocated by the parser.
         */
        xmlCleanupParser();

  return java_home;
}

int main(int argc, char **argv)
{
  int i;
  char cwd[PATH_MAX+1];

  if (getcwd(cwd, PATH_MAX+1) == NULL) {
         perror("getcwd failed");
        } else {
        xmlChar * java_home = get_java_home(cwd);

        char java_exe[PATH_MAX+1];
        if (java_home){
         strncpy(java_exe, java_home, PATH_MAX+1);
         strncat(java_exe, "/bin/java", PATH_MAX+1);

        } else {
         strncpy(java_exe, "java", PATH_MAX+1);
        }


        char *new_args[argc+2];

        new_args[0] = java_exe;
        new_args[1] = "-jar";
        new_args[2] = "bin/bbwp.jar";
        for(i = 1; i < argc; i++) {
         new_args[2+i] = argv[i];
        }
        new_args[argc+2] = NULL;

        if (execvp(new_args[0], new_args) < 0) {
         printf("execvp failed\n");
        }
  }

  return 0;
}
