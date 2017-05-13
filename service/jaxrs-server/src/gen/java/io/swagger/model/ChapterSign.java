/*
 * StoryTime API
 * Backend for managing choose-your-own-destiny style stories.
 *
 * OpenAPI spec version: 0.3.0
 * Contact: saynotospam@ajegames.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import javax.validation.constraints.*;

/**
 * ChapterSign
 */
@javax.annotation.Generated(value = "io.swagger.codegen.languages.JavaJerseyServerCodegen", date = "2017-05-12T22:56:19.776-07:00")
public class ChapterSign   {
  @JsonProperty("destinationId")
  private Integer destinationId = null;

  @JsonProperty("teaser")
  private String teaser = null;

  public ChapterSign destinationId(Integer destinationId) {
    this.destinationId = destinationId;
    return this;
  }

   /**
   * Get destinationId
   * @return destinationId
  **/
  @JsonProperty("destinationId")
  @ApiModelProperty(value = "")
  public Integer getDestinationId() {
    return destinationId;
  }

  public void setDestinationId(Integer destinationId) {
    this.destinationId = destinationId;
  }

  public ChapterSign teaser(String teaser) {
    this.teaser = teaser;
    return this;
  }

   /**
   * Get teaser
   * @return teaser
  **/
  @JsonProperty("teaser")
  @ApiModelProperty(value = "")
  public String getTeaser() {
    return teaser;
  }

  public void setTeaser(String teaser) {
    this.teaser = teaser;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ChapterSign chapterSign = (ChapterSign) o;
    return Objects.equals(this.destinationId, chapterSign.destinationId) &&
        Objects.equals(this.teaser, chapterSign.teaser);
  }

  @Override
  public int hashCode() {
    return Objects.hash(destinationId, teaser);
  }


  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ChapterSign {\n");
    
    sb.append("    destinationId: ").append(toIndentedString(destinationId)).append("\n");
    sb.append("    teaser: ").append(toIndentedString(teaser)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

